import { IEvent } from "../../../lib/Event";

export interface IUserEvent extends IEvent {
    type: string;
    payload: { id: string };
}

export class UserCreatedEvent implements IUserEvent {
    type = 'user_created';
    payload: { id: string }

    constructor(id: string) {
        this.payload = {
            id: id
        };
    }
}

export class UserUpdatedEvent implements IUserEvent {
    type = 'user_updated';
    payload: { id: string }

    constructor(id: string) {
        this.payload = {
            id: id
        };
    }
}