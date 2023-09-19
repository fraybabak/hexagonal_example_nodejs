import { Router } from "express";

import userRouter from "./user/user.router";
import postRouter from "./post/post.route";
const router = Router()

router.use('/api/v1/user', userRouter)

router.use('/api/v1/post', postRouter)

export default router