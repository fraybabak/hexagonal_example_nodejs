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

    constructor(title: string, content: string, authorId: string, id?: string) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.authorId = authorId;
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