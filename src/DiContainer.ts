import 'reflect-metadata';
import { container } from 'tsyringe';
import { UserCreateController } from './adapter/primary/UserCreateController';
import { AuthUserController } from './adapter/primary/AuthUserController';
import { FindUserUseCase } from './application/User/usecases/findUser';
import { CreateUserUseCase } from './application/User/usecases/createUser';
import { AuthenticateUserUseCase } from './application/User/usecases/authenticateUser';
import { UserRepository } from './adapter/secondary/user/UserRepository';
import { UserEventhandler } from './adapter/secondary/user/UserEventHandler';
import { CreatePostUseCase } from './application/Post/usecases/createPost';
import { PostRepository } from './adapter/secondary/post/PostRepository';
import { PostEventhandler } from './adapter/secondary/post/PostEventHandler';

container.registerSingleton('UserCreateController', UserCreateController)
container.registerSingleton('FindUserUseCase', FindUserUseCase)
container.registerSingleton('CreateUserUseCase', CreateUserUseCase)
container.registerSingleton('UserRepository', UserRepository)
container.registerSingleton('AuthUserController', AuthUserController)
container.registerSingleton('AuthenticateUserUseCase', AuthenticateUserUseCase)
container.registerSingleton('UserEventHandler', UserEventhandler)


container.registerSingleton('CreatePostUseCase', CreatePostUseCase)
container.registerSingleton('PostRepository', PostRepository)
container.registerSingleton('PostEventHandler', PostEventhandler)

export const userCreateController = container.resolve(UserCreateController)
export const authUserController = container.resolve(AuthUserController)

