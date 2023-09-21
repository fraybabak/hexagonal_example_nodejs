import "reflect-metadata";

import { inject, injectable } from "tsyringe";


import { UserRepositoryPort } from "../port/secondary/UserRepositoryPort";
import { IUser, IUserCreate } from "../domain/IUser";
import { User } from "../domain/User";
import { CreateUserPort } from "../port/primary/CreateUserPort";
import { UnCaughtError } from "../../../Errors/Uncaught"
import { hashPassword } from "../../helpers/password_utility";
import { UserCreatedEvent } from "../domain/UserEvent";
import { UserEventHandlerPort } from "../port/secondary/UserEventHandlerPort";
import { v4 as uuidv4 } from 'uuid';
import { Pretify } from "../../../lib/types"
import { UserMapper } from "../../../adapter/mappers/UserMapper";

@injectable()
export class CreateUserUseCase implements CreateUserPort {
    hashPassword: typeof hashPassword;
    constructor(@inject("UserRepository") private userRepository: UserRepositoryPort, @inject('UserEventHandler') private userEventHandler: UserEventHandlerPort) {
        this.userRepository = userRepository;
        this.hashPassword = hashPassword;
    }
    async create(create: Pretify<IUserCreate>) {
        try {
            create.password = await this.hashPassword(create.password)
            const user = new User(create.name, create.email, create.password, uuidv4());
            const persist = await this.userRepository.create(UserMapper.toPersistence(user));

            if (persist.id) {
                user.addEvent(new UserCreatedEvent(persist.id));
                this.userEventHandler.handle(user.events[0]);

            }
            return UserMapper.toUI(persist);

        } catch (error: any) {
            throw new UnCaughtError(error.message)
        }
    }
}
