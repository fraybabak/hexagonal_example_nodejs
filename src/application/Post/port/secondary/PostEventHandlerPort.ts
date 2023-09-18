import { IPostEvent } from "../../domain/PostEvent";



export interface PostEventHandlerPort {
    handle(event: IPostEvent): void;
}