import { IPostEvent } from "../../domain/PostEvent";
import { Pretify } from "../../../../lib/types";


export interface PostEventHandlerPort {
    handle(event: Pretify<IPostEvent>): void;
}