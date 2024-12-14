import { Router } from "express"
import { uploadMiddleware } from "../middleware/UploadMiddleware"
import { RetrainController } from "../controller/RetrainController"

export const retrainRouter = Router()

retrainRouter.post("/retrain", RetrainController.retrain)