import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { CreateUserPort } from "../../application/User/port/primary/CreateUserPort"
import { IUser } from '../../application/User/domain/IUser';
import { UserMapper } from '../mappers/UserMapper';

@injectable()
export class UserCreateController {
    private userMapper: typeof UserMapper
    constructor(@inject('CreateUserUseCase') private userCreate: CreateUserPort) {
        this.userCreate = userCreate
        this.userMapper = UserMapper

    }
    async create(body: {
        name: string,
        password: string,
        email: string
    }): Promise<any> {
        try {
            const userDTO = this.userMapper.toDomain(body)
            let user = await this.userCreate.create(userDTO.name, userDTO.email, userDTO.password)
            return this.userMapper.toUI(user)
        } catch (error) {
            throw error
        }
    }
}