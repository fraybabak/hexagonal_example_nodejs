import { IUser } from "../../domain/IUser";

export interface AuthenticateUserPort {
    login(email: string, password: string): Promise<string>;
    authenticate(token: string): Promise<IUser>;
}