import { IUser } from "../../application/User/domain/IUser";


export class UserMapper {
    static toDto(user: IUser) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
        }
    }
    static toDomain(user: any) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
        }
    }
    static toUI(user: IUser) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    }
}