import {
    Length,
    IsEmail,
    validate,
} from 'class-validator';

import { ValidateObject } from '../bodyTransformer';


export class CreatePost {
    @Length(3, 20)
    title: string;

    @Length(8, 10000)
    body: string;
}


export const createPostValidation = async (body: any): Promise<Boolean> => {
    return ValidateObject(body, CreatePost)
}