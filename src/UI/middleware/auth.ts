import { Request, Response } from "express";
import { authUserController } from "../../DiContainer";
import { IUser } from "../../application/User/domain/IUser";


declare module 'express-serve-static-core' {
    interface Request {
        user?: IUser;
    }
}
export const authMiddleware = async (req: Request, res: Response, next: any) => {
    try {
        const token = req.headers.authorization?.split('jwt')[1]
        if (!token) {
            throw new Error('Token not found')
        }
        const user = await authUserController.authenticate(token)
        req.user = user

        next()
    } catch (error: any) {
        return res.status(error.status).json({ error: error.message })
    }
}