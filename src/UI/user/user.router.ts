import { Router } from "express";
import { userCreateController, authUserController } from "../../DiContainer"
import { authMiddleware } from "../middleware/auth"

const router = Router()

router.post('/login', async (req, res) => {
    try {
        let token = await authUserController.login(req.body)
        return res.status(200).json(token)
    } catch (error: any) {
        return res.status(error.status).json({ error: error.message })
    }
})
router.post('/create', async (req, res) => {
    try {
        return res.status(201).json(await userCreateController.create(req.body))
    } catch (error: any) {
        return res.status(error.status).json({ error: error.message })
    }
})

export default router
