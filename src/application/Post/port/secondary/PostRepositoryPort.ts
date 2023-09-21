import { IPost, IPostCreateRepository } from "../../domain/IPost";
import { Post } from "../../domain/Post";
import { Option, Pretify } from "../../../../lib/types"


export interface PostRepositoryPort {
    create(post: Pretify<IPostCreateRepository>): Promise<IPost>;
    findById(id: string): Promise<Option<IPost>>;
    findbyAuthorId(authorId: string): Promise<Option<IPost[]>>;
    delete(id: string): Promise<boolean>;
}