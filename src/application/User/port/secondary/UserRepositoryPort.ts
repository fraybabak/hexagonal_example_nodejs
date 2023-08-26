import { IUser } from "../../domain/IUser"
import { User } from "../../domain/User"

export interface UserRepositoryPort {
    create(user: IUser): Promise<User>
    findById(id: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
}