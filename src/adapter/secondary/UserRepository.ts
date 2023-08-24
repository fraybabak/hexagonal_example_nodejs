

import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { UserRepositoryPort } from '../../application/User/port/secondary/UserRepositoryPort';
import { IUser } from '../../application/User/domain/IUser';
import { User } from '../../application/User/domain/User';

@injectable()
export class UserRepository implements UserRepositoryPort {



    async create(user: IUser): Promise<User> {
        return user;
    }

}