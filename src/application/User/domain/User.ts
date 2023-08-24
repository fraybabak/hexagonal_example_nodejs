


import { UserEmail, UserId, UserName, UserPassword, IUser } from "./IUser";

export class User implements IUser {
    public id?: UserId;
    public name: UserName;
    public email: UserEmail;
    public password: UserPassword;

    constructor(name: UserName, email: UserEmail, password: UserPassword, id?: UserId) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

}