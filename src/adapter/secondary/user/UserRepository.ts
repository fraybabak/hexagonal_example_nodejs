

import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { UserRepositoryPort } from '../../../application/User/port/secondary/UserRepositoryPort';
import { IUser } from '../../../application/User/domain/IUser';
import { User } from '../../../application/User/domain/User';
import db from '../../../infrastructure/db/db'
import { PrismaClient } from '@prisma/client';
import { UnCaughtError } from "../../../Errors/Uncaught"

@injectable()
export class UserRepository implements UserRepositoryPort {
    private db: PrismaClient;
    private model: typeof db.user;
    constructor() {
        this.db = db;
        this.model = this.db.user;
    }


    async create(user: IUser) {
        try {
            let exists = await this.model.findUnique({ where: { email: user.email } })
            if (exists) {
                throw new UnCaughtError('user already exists', 400)
            }
            let newUser = await this.model.create({
                data: {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    id: user.id
                }
            });
            return new User(newUser.name, newUser.email, newUser.password, newUser.id);

        } catch (error: any) {
            throw new UnCaughtError(error.message)

        }
    }
    async findById(id: string) {
        try {
            let user = await this.model.findUnique({ where: { id: id } })
            if (user) {
                return new User(user.name, user.email, user.password, user.id)

            }
            return null

        } catch (error: any) {
            throw new UnCaughtError(error.message)
        }
    }
    async findByEmail(email: string) {
        try {
            let user = await this.model.findUnique({ where: { email: email } })
            if (user) {
                return new User(user.name, user.email, user.password, user.id)

            }
            return null

        } catch (error: any) {
            throw new UnCaughtError(error.message)
        }
    }

}