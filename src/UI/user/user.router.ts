import { Router } from "express";
import { userCreateController } from "../../DiContainer"

const router = Router()

router.post('/create', async (req, res) => {
    try {
        return res.status(201).json(await userCreateController.create(req.body))
    } catch (error: any) {
        return res.status(error.status).json({ error: error.message })
    }
})

export default router
