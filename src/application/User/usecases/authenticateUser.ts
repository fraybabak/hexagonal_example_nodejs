import "reflect-metadata";

import { inject, injectable } from "tsyringe";


import { FindUserPort } from "../port/primary/FindUserPort";
import { comparePassword } from "../../helpers/password_utility";
import { UnCaughtError } from "../../../Errors/Uncaught"
import { generateToken, verifyToken } from "../../helpers/jwt_utility";
import { AuthenticateUserPort } from "../port/primary/AuthenticateUserPort";
import { IUser } from "../domain/IUser";
import { NotFoundError } from "../../../Errors/NotFound";



@injectable()
export class AuthenticateUserUseCase implements AuthenticateUserPort {
    comparePassword: typeof comparePassword;
    generateToken: typeof generateToken;
    verifyToken: typeof verifyToken;

    constructor(@inject('FindUserUseCase') private userFind: FindUserPort) {
        this.userFind = userFind
        this.comparePassword = comparePassword
        this.generateToken = generateToken
        this.verifyToken = verifyToken
    }
    async login(email: string, password: string) {
        try {
            let user = await this.userFind.findByEmail(email)
            if (!user) {
                throw new NotFoundError('user not found')
            }
            let isPasswordValid = await this.comparePassword(password, user.password)
            if (!isPasswordValid) {
                throw new UnCaughtError('invalid password', 401)
            }
            let token = await this.generateToken({ id: user.id ? user.id : "" }) // tslint:disable-line: no-string-literal  
            return token


        } catch (error: any) {
            throw new UnCaughtError(error.message)
        }
    }
    async authenticate(token: string): Promise<IUser> {
        try {
            let decoded = await this.verifyToken(token)
            let user = await this.userFind.findById((decoded.payload as { id: string }).id)
            if (!user) {
                throw new NotFoundError('user not found', 404)
            }
            return user
        } catch (error: any) {
            throw new UnCaughtError(error.message)
        }
    }

}