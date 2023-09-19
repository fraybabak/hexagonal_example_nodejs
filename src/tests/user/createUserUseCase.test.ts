import "reflect-metadata";
import { container } from "tsyringe";
import { UserRepositoryPort } from '../../application/User/port/secondary/UserRepositoryPort';
import { FakeUserRepository } from "../fakes/fakeUserRepository";
import { CreateUserUseCase } from "../../application/User/usecases/createUser";
import { UserEventhandler } from "../../adapter/secondary/user/UserEventHandler";
import { UserEventHandlerPort } from "../../application/User/port/secondary/UserEventHandlerPort";
import { BaseEventHandler } from "../../adapter/secondary/events/BaseEventHandler";


describe('Create User', () => {
    let userRepository: UserRepositoryPort;
    let userEventHandler: UserEventHandlerPort;
    beforeEach(() => {

        container.registerSingleton("UserRepository", FakeUserRepository);
        container.registerSingleton("UserEventHandler", UserEventhandler)
        userRepository = container.resolve(FakeUserRepository);
        userEventHandler = container.resolve(UserEventhandler)
    });
    it('Should create a user', async () => {
        const eventPromise = new Promise((resolve) => BaseEventHandler.on("user_created", (event) => {
            console.log(event);
            resolve(event);
        }));
        const createUserUseCase = new CreateUserUseCase(userRepository, userEventHandler);
        const user = await createUserUseCase.create({
            "name": "test", "email": "test1@test.com", "password": "123456"
        });
        const event = await eventPromise;
        expect(user).toHaveProperty("name");
        expect(user).toHaveProperty("email");
        expect(user).toHaveProperty("password");
        expect(user).toHaveProperty("id");
        expect(event).toHaveProperty("id");


    });
    it('Should not create a user with an existing email', async () => {

        const createUserUseCase = new CreateUserUseCase(userRepository, userEventHandler);
        await expect(createUserUseCase.create({
            "name": "test", "email": "test@test.com", "password": "123456"
        })).rejects.toThrow("Email already taken");
    });
});
