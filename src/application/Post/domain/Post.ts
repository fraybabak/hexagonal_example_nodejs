import { UserId } from "../../../application/User/domain/IUser";
import { IPost, PostId, PostTitle, PostContent } from "./IPost";
import { IPostEvent } from "./PostEvent";

export class Post implements IPost {
    public id?: PostId;
    public title: PostTitle;
    public content: PostContent;
    public authorId: UserId;
    public createdAt?: Date;
    public updatedAt?: Date;
    public deletedAt?: Date;
    public events: IPostEvent[] = [];

    constructor(title: string, content: string, authorId: string, id?: string, createdAt?: Date, updatedAt?: Date, deletedAt?: Date) {
        if (id) {
            this.id = id;
        }
        if (createdAt) {
            this.createdAt = createdAt;
        }
        if (updatedAt) {
            this.updatedAt = updatedAt;
        }
        if (deletedAt) {
            this.deletedAt = deletedAt;
        }
        this.title = title;
        this.content = content;
        this.authorId = authorId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
    async domainEvents(): Promise<IPostEvent[]> {
        return this.events;
    }
    async clearEvents(): Promise<void> {
        this.events = [];
    }
    async addEvent(event: IPostEvent): Promise<void> {
        this.events.push(event);
    }

}