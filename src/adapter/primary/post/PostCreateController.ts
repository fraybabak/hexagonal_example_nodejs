import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import { CreatePostPort } from "../../../application/Post/port/primary/CreatePostPort"


@injectable()
export class PostCreateController {
    constructor(@inject('CreatePostUseCase') private postCreate: CreatePostPort) {
        this.postCreate = postCreate
    }
    async create(body: {
        title: string,
        content: string,
        authorId: string
    }): Promise<any> {
        try {
            let post = await this.postCreate.create(body)
            return post
        } catch (error) {
            throw error
        }
    }
}