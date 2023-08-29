import "reflect-metadata";
import { container } from "tsyringe";
import { UserRepositoryPort } from '../application/User/port/secondary/UserRepositoryPort';
import { FakeUserRepository } from "./fakes/fakeUserRepository";
import { FindUserUseCase } from "../application/User/usecases/findUser";



describe('Find User', () => {
    let userRepository: UserRepositoryPort;
    beforeEach(() => {

        container.registerSingleton("UserRepository", FakeUserRepository);
        userRepository = container.resolve(FakeUserRepository);
    });
    it('Should find a user by email', async () => {
        const findUserUseCase = new FindUserUseCase(userRepository);
        const user = await findUserUseCase.findByEmail("test@test.com");
        expect(user).toHaveProperty("name");
        expect(user).toHaveProperty("email");
        expect(user).toHaveProperty("password");
        expect(user).toHaveProperty("id");
    });
    it('Should find a user by id', async () => {

        const findUserUseCase = new FindUserUseCase(userRepository);
        const user = await findUserUseCase.findById("1");
        expect(user).toHaveProperty("name");
        expect(user).toHaveProperty("email");
        expect(user).toHaveProperty("password");
        expect(user).toHaveProperty("id");
    });
    it('Should not find a user with an non existing email', async () => {

        const findUserUseCase = new FindUserUseCase(userRepository);
        await expect(findUserUseCase.findByEmail("test@test2.com")).rejects.toThrow("user not found");
    });
    it('Should not find a user with an non existing id', async () => {

        const findUserUseCase = new FindUserUseCase(userRepository);
        await expect(findUserUseCase.findById("2")).rejects.toThrow("user not found");
    }
    );
});