import { Router } from "express";

import userRouter from "./user/user.router";

const router = Router()

router.use('/user', userRouter)

export default router