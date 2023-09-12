import { IUserEvent } from "../../domain/UserEvent";

export interface UserEventHandlerPort {
    handle(event: IUserEvent): void;
}