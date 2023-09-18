import { IPost, IPostCreateRepository } from "../../domain/IPost";
import { Post } from "../../domain/Post";
import { Option } from "../../../../lib/types"

export interface PostRepositoryPort {
    create(post: IPostCreateRepository): Promise<Post>;
    findById(id: string): Promise<Option<Post>>;
    findbyAuthorId(authorId: string): Promise<Option<IPost[]>>;
    delete(id: string): Promise<boolean>;
}