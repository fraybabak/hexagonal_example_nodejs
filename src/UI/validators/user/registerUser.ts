import {
    Length,
    IsEmail,
    validate,
} from 'class-validator';

import { ValidateObject } from '../bodyTransformer';

export class RegisterUser {
    @Length(3, 20)
    name: string;

    @IsEmail()
    email: string;

    @Length(8, 20)
    password: string;
}



export const registerUserValidation = async (body: any): Promise<Boolean> => {
    return ValidateObject(body, RegisterUser)
}

