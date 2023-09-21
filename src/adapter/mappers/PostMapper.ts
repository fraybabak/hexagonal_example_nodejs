import { IPost, IPostToUI } from "../../application/Post/domain/IPost";




export class PostMapper {
    static toDto(post: IPost) {
        return {
            id: post.id,
            title: post.title,
            content: post.content,
            authorId: post.authorId,
        }
    }
    static toDomain(post: any) {
        return {
            id: post.id,
            title: post.title,
            content: post.content,
            authorId: post.authorId,
        }
    }
    static toUI(post: any): IPostToUI {
        return {
            id: post.id as string,
            title: post.title,
            content: post.content,
            authorId: post.authorId,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        }
    }
    static toPersistence(post: IPost) {
        return {
            id: post.id,
            title: post.title,
            content: post.content,
            authorId: post.authorId,
        }
    }
}