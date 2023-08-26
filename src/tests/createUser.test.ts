import "reflect-metadata";
import { container } from "tsyringe";
import { UserRepositoryPort } from '../application/User/port/secondary/UserRepositoryPort';
import { FakeUserRepository } from "./fakes/fakeUserRepository";
import { CreateUserUseCase } from "../application/User/usecases/createUser";


describe('Create User', () => {
    let userRepository: UserRepositoryPort;
    beforeEach(() => {

        container.registerSingleton("UserRepository", FakeUserRepository);
        userRepository = container.resolve(FakeUserRepository);
    });
    it('Should create a user', async () => {
        const createUserUseCase = new CreateUserUseCase(userRepository);
        const user = await createUserUseCase.create("test", "test@test.com", "123456");
        expect(user).toHaveProperty("name");
        expect(user).toHaveProperty("email");
        expect(user).toHaveProperty("password");
    });
});
