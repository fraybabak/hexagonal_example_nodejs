import "reflect-metadata";
import { container } from "tsyringe";
import { UserRepositoryPort } from '../../application/User/port/secondary/UserRepositoryPort';
import { FakeUserRepository } from "../fakes/fakeUserRepository";
import { FindUserUseCase } from "../../application/User/usecases/findUser";
import { AuthenticateUserUseCase } from "../../application/User/usecases/authenticateUser";
import { generateToken } from "../../application/helpers/jwt_utility";


describe('Authenticate User', () => {
    let userRepository: UserRepositoryPort;
    beforeEach(() => {

        container.registerSingleton("UserRepository", FakeUserRepository);
        userRepository = container.resolve(FakeUserRepository);
    });
    it('Should authenticate a user', async () => {
        const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
        const user = await userRepository.findByEmail("test@test.com");
        if (!user) {
            throw new Error("user not found");
        }
        const token = await generateToken({ id: user.id ? user.id : "" });
        const authenticate = await authenticateUserUseCase.authenticate(token)
        expect(authenticate).toHaveProperty("name");
        expect(authenticate).toHaveProperty("email");
        expect(authenticate).toHaveProperty("password");
        expect(authenticate).toHaveProperty("id");
    });
    it('Should not authenticate a user with an invalid token', async () => {

        const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
        await expect(authenticateUserUseCase.authenticate("invalid token")).rejects.toThrow("Invalid Compact JWS");
    }
    );
});