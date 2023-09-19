import { IUser, IUserCreate } from "../../domain/IUser";
import { Pretify } from "../../../../lib/types";

export interface CreateUserPort {
    create(user: Pretify<IUserCreate>): Promise<IUser>;
}