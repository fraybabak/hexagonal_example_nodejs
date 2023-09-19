import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import { PostRepositoryPort } from '../../../application/Post/port/secondary/PostRepositoryPort';
import { IPostCreateRepository } from '../../../application/Post/domain/IPost';
import { Post } from '../../../application/Post/domain/Post';
import db from '../../../infrastructure/db/db'
import { PrismaClient } from '@prisma/client';
import { UnCaughtError } from "../../../Errors/Uncaught"
import { NotFoundError } from '../../../Errors/NotFound';
import { Pretify } from "../../../lib/types";

@injectable()
export class PostRepository implements PostRepositoryPort {
    private db: PrismaClient;
    private model: typeof db.post;
    constructor() {
        this.db = db;
        this.model = this.db.post;
    }
    async create(post: Pretify<IPostCreateRepository>) {
        try {
            let newPost = await this.model.create({
                data: {
                    id: post.id,
                    title: post.title,
                    content: post.content,
                    authorId: post.authorId,
                    createdAt: post.createdAt,
                    updatedAt: post.updatedAt,
                }
            });
            return new Post(newPost.title, newPost.content, newPost.authorId, newPost.id);

        } catch (error: any) {
            throw new UnCaughtError(error.message, 400)

        }


    }
    async findById(id: string) {
        try {
            let post = await this.model.findUnique({ where: { id: id } })
            if (post) {
                return new Post(post.title, post.content, post.authorId, post.id)

            }
            throw new NotFoundError('post not found', 404)

        } catch (error: any) {
            throw new UnCaughtError(error.message)
        }
    }
    async findbyAuthorId(authorId: string) {
        try {
            let posts = await this.model.findMany({ where: { authorId: authorId } })
            if (posts) {
                return posts.map(post => new Post(post.title, post.content, post.authorId, post.id))

            }
            return []

        } catch (error: any) {
            throw new UnCaughtError(error.message)
        }
    }
    async delete(id: string) {
        try {
            let post = await this.model.delete({ where: { id: id } })
            if (!post) {
                throw new NotFoundError('post not found', 404)
            }
            return true
        } catch (error: any) {
            throw new UnCaughtError(error.message)
        }
    }
}
