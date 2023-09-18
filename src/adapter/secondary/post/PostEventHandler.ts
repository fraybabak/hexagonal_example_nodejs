import { EventEmitter } from 'events';
import "reflect-metadata";

import { inject, injectable } from "tsyringe";
import { BaseEventHandler } from "../events/BaseEventHandler";


import { PostEventHandlerPort } from '../../../application/Post/port/secondary/PostEventHandlerPort';
import { IPostEvent } from '../../../application/Post/domain/PostEvent';

@injectable()
export class PostEventhandler implements PostEventHandlerPort {
    private eventEmitter: EventEmitter;
    constructor() {
        this.eventEmitter = BaseEventHandler;
    }
    handle(event: IPostEvent): void {
        this.eventEmitter.emit(event.type, event.payload);
    }
}