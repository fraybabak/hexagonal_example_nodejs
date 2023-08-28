import {
    Length,
    IsEmail,
    validate,
} from 'class-validator';

import { plainToClass } from 'class-transformer';
import { UnCaughtError } from '../../../Errors/Uncaught';


export class RegisterUser {
    @Length(3, 20)
    name: string;

    @IsEmail()
    email: string;

    @Length(8, 20)
    password: string;
}


export async function registerUserValidate(body: any): Promise<Boolean> {
    const user = plainToClass(RegisterUser, body);
    const errors = await validate(user);
    if (errors.length > 0) {
        const errorMessages: { [key: string]: string[] } = {};
        errors.forEach((error: any) => {
            errorMessages[error.property] = Object.values(error.constraints || {});
        });

        throw new UnCaughtError(JSON.stringify(errorMessages), 400);

    }
    return true;
}


