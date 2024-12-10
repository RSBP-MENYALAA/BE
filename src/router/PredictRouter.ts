import { Router } from "express";
import { uploadMiddleware } from "../middleware/UploadMiddleware";
import { PredictController } from "../controller/PredictController";

export const predictRouter = Router();

predictRouter.post("/predict", uploadMiddleware, PredictController.predict);






