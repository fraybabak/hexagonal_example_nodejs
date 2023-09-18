import { IPostCreate, IPost } from "../../domain/IPost";




export interface CreatePostPort {
    create(post: IPostCreate): Promise<IPost>;
}