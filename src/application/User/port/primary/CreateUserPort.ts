import { IUserCreate, IUserToUI } from "../../domain/IUser";
import { Pretify } from "../../../../lib/types";

export interface CreateUserPort {
    create(user: Pretify<IUserCreate>): Promise<IUserToUI>;
}