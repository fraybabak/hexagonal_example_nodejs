import { UserId } from "../../../application/User/domain/IUser";

export type PostId = string;
export type PostTitle = string;
export type PostContent = string;

export interface IPost {
    id?: PostId;
    title: PostTitle;
    content: PostContent;
    authorId: UserId;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface IPostCreate {
    title: PostTitle;
    content: PostContent;
    authorId: UserId;
}

export interface IPostCreateRepository extends IPostCreate {
    id: PostId;
    createdAt: Date;
    updatedAt: Date;
}

export interface IPostToUI {
    id: PostId;
    title: PostTitle;
    content: PostContent;
    authorId: UserId;
    createdAt: Date;
    updatedAt: Date;
}