import "reflect-metadata";

import { inject, injectable } from "tsyringe";


import { UserRepositoryPort } from "../port/secondary/UserRepositoryPort";
import { IUser } from "../domain/IUser";
import { User } from "../domain/User";
import { CreateUserPort } from "../port/primary/CreateUserPort";


@injectable()
export class CreateUserUseCase implements CreateUserPort {
    constructor(@inject("UserRepository") private userRepository: UserRepositoryPort) {
        this.userRepository = userRepository;
    }
    create(name: string, email: string, password: string): Promise<IUser> {
        const user = new User(name, email, password);
        return this.userRepository.create(user);
    }
}
