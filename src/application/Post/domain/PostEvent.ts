import { IEvent } from '../../../lib/Event';
export interface IPostEvent extends IEvent {
    type: string;
    payload: { id: string };
}


export class PostCreatedEvent implements IPostEvent {
    type = 'post_created';
    payload: { id: string }

    constructor(id: string) {
        this.payload = {
            id: id
        };
    }
}

export class PostUpdatedEvent implements IPostEvent {
    type = 'post_updated';
    payload: { id: string }

    constructor(id: string) {
        this.payload = {
            id: id
        };
    }
}

export class PostDeletedEvent implements IPostEvent {
    type = 'post_deleted';
    payload: { id: string }

    constructor(id: string) {
        this.payload = {
            id: id
        };
    }
}
