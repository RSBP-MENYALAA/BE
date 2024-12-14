import { Router } from "express"
import { AuthMiddleware } from "../middleware/AuthMiddleware"
import { RetrainController } from "../controller/RetrainController"

export const retrainRouter = Router()

retrainRouter.post("/retrain", AuthMiddleware, RetrainController.retrain)