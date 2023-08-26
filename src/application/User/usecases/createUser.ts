import "reflect-metadata";

import { inject, injectable } from "tsyringe";


import { UserRepositoryPort } from "../port/secondary/UserRepositoryPort";
import { IUser } from "../domain/IUser";
import { User } from "../domain/User";
import { CreateUserPort } from "../port/primary/CreateUserPort";
import { UnCaughtError } from "../../../Errors/Uncaught"
import { hashPassword } from "../../helpers/password_utility";

@injectable()
export class CreateUserUseCase implements CreateUserPort {
    hashPassword: typeof hashPassword;
    constructor(@inject("UserRepository") private userRepository: UserRepositoryPort) {
        this.userRepository = userRepository;
        this.hashPassword = hashPassword;
    }
    async create(name: string, email: string, password: string): Promise<IUser> {
        try {
            const user = new User(name, email, await this.hashPassword(password));
            return this.userRepository.create(user);

        } catch (error: any) {
            throw new UnCaughtError(error.message)
        }
    }
}
