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
        if (this.name.length < 4) {
            throw new Error("Name must be at least 4 characters long");
        }
        if (this.password.length < 8) {
            throw new Error("Password must be at least 8 characters long");
        }
        if (!this.email.includes("@")) {
            throw new Error("Email must be valid");
        }

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