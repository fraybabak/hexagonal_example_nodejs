import { IUser } from "../../domain/IUser";


export interface FindUserPort {
    findById(id: string): Promise<IUser | null>
    findByEmail(email: string): Promise<IUser | null>
}