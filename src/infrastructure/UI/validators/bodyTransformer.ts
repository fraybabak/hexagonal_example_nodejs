import { ClassConstructor, ClassTransformer, plainToInstance } from 'class-transformer';
import {
    validate,
} from 'class-validator';

import { UnCaughtError } from '../../../Errors/Uncaught';



export async function ValidateObject(body: any, Dto: any): Promise<Boolean> {
    const user = plainToInstance(Dto, body);
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

