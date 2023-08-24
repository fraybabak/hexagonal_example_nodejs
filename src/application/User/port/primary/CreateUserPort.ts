import { IUser } from "../../domain/IUser";


export interface CreateUserPort {
    create(name: string, email: string, password: string): Promise<IUser>;
}