import { UserEmail, UserId, UserName, UserPassword, IUser } from "./IUser";
import { IUserEvent } from "./UserEvent";

export class User implements IUser {
    public id?: UserId;
    public name: UserName;
    public email: UserEmail;
    public password: UserPassword;
    public events: IUserEvent[] = [];

    constructor(name: UserName, email: UserEmail, password: UserPassword, id?: UserId) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;

    }
    async domainEvents(): Promise<IUserEvent[]> {
        return this.events;
    }
    async clearEvents(): Promise<void> {
        this.events = [];
    }
    async addEvent(event: IUserEvent): Promise<void> {
        this.events.push(event);
    }

}