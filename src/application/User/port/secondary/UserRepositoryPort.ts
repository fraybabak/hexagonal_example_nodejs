import { IUser } from "../../domain/IUser"
import { User } from "../../domain/User"

export interface UserRepositoryPort {
    create(user: IUser): Promise<User>
}