import { EventEmitter } from 'events';
import "reflect-metadata";

import { inject, injectable } from "tsyringe";
import { BaseEventHandler } from "./events/BaseEventHandler";

import { UserEventHandlerPort } from "../../application/User/port/secondary/UserEventHandlerPort";
import { IUserEvent } from "../../application/User/domain/UserEvent";

@injectable()
export class UserEventhandler implements UserEventHandlerPort {
    private eventEmitter: EventEmitter;
    constructor() {
        this.eventEmitter = BaseEventHandler;
    }
    handle(event: IUserEvent): void {
        this.eventEmitter.emit(event.type, event.payload);
    }
}