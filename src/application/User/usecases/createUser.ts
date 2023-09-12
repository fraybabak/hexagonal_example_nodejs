import "reflect-metadata";

import { inject, injectable } from "tsyringe";


import { UserRepositoryPort } from "../port/secondary/UserRepositoryPort";
import { IUser } from "../domain/IUser";
import { User } from "../domain/User";
import { CreateUserPort } from "../port/primary/CreateUserPort";
import { UnCaughtError } from "../../../Errors/Uncaught"
import { hashPassword } from "../../helpers/password_utility";
import { UserCreatedEvent } from "../domain/UserEvent";
import { UserEventHandlerPort } from "../port/secondary/UserEventHandlerPort";

@injectable()
export class CreateUserUseCase implements CreateUserPort {
    hashPassword: typeof hashPassword;
    constructor(@inject("UserRepository") private userRepository: UserRepositoryPort, @inject('UserEventHandler') private userEventHandler: UserEventHandlerPort) {
        this.userRepository = userRepository;
        this.hashPassword = hashPassword;
    }
    async create(name: string, email: string, password: string): Promise<IUser> {
        try {
            const user = new User(name, email, await this.hashPassword(password));
            const persist = await this.userRepository.create(user);
            if (persist.id) {
                user.addEvent(new UserCreatedEvent(persist.id));
                await this.userEventHandler.handle(user.events[0]);

            }
            return persist;

        } catch (error: any) {
            throw new UnCaughtError(error.message)
        }
    }
}
