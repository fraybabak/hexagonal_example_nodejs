import { IPostCreate, IPostCreateRepository } from "../../domain/IPost";


import { Pretify } from "../../../../lib/types";

export interface CreatePostPort {
    create(post: Pretify<IPostCreate>): Promise<IPostCreateRepository>;
}