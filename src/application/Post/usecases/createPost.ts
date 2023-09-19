import "reflect-metadata";

import { inject, injectable } from "tsyringe";



import { IPostCreate, IPost } from "../domain/IPost";
import { Post } from "../domain/Post";
import { CreatePostPort } from "../port/primary/CreatePostPort";

import { PostRepositoryPort } from "../port/secondary/PostRepositoryPort";
import { UnCaughtError } from "../../../Errors/Uncaught"
import { PostCreatedEvent } from "../domain/PostEvent";
import { v4 as uuidv4 } from 'uuid';


import { PostEventHandlerPort } from "../port/secondary/PostEventHandlerPort";


@injectable()
export class CreatePostUseCase implements CreatePostPort {
    constructor(@inject("PostRepository") private postRepository: PostRepositoryPort, @inject('PostEventHandler') private postEventHandler: PostEventHandlerPort) {
        this.postRepository = postRepository;
    }
    async create(create: IPostCreate): Promise<IPost> {
        try {
            const post = new Post(create.title, create.content, create.authorId, uuidv4(), new Date(), new Date())

            const persist = await this.postRepository.create({
                id: post.id as string,
                title: post.title,
                content: post.content,
                authorId: post.authorId,
                createdAt: post.createdAt as Date,
                updatedAt: post.updatedAt as Date
            });
            if (persist.id) {
                persist.addEvent(new PostCreatedEvent(persist.id));
                this.postEventHandler.handle(persist.events[0]);

            }
            return persist;

        } catch (error: any) {
            throw new UnCaughtError(error.message)
        }
    }
}

