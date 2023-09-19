import { Router } from "express";

import { postCreateController, authUserController } from "../../../../DiContainer"
import { authMiddleware } from "../../middleware/auth"
import { createPostValidation } from "../../validators/post/createPost"
import { Request, Response } from "express";
const router = Router()



router.post('/', authMiddleware, async (req: Request, res) => {
    try {
        await createPostValidation(req.body)
        if (req.user) {
            return res.status(201).json(await postCreateController.create({
                ...req.body,
                authorId: req.user.id as string,
            }))
        }
    } catch (error: any) {
        return res.status(error.status).json({ error: error.message })
    }
})

export default router