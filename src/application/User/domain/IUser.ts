
export type UserId = string;
export type UserName = string;
export type UserEmail = string;
export type UserPassword = string;

export interface IUser {
    id?: UserId;
    name: UserName;
    email: UserEmail;
    password: UserPassword;
}

export interface IUserCreate {
    name: UserName;
    email: UserEmail;
    password: UserPassword;
}
