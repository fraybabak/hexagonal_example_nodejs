import 'reflect-metadata';
import { container } from 'tsyringe';
import { UserCreateController } from './adapter/primary/UserCreateController';
import { CreateUserUseCase } from './application/User/usecases/createUser';
import { UserRepository } from './adapter/secondary/UserRepository';

container.registerSingleton('UserCreateController', UserCreateController)
container.registerSingleton('CreateUserUseCase', CreateUserUseCase)
container.registerSingleton('UserRepository', UserRepository)

export const userCreateController = container.resolve(UserCreateController)

