import { Router } from "express";
import { uploadMiddleware } from "../middleware/UploadMiddleware";
import { PredictController } from "../controller/PredictController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export const predictRouter = Router();

predictRouter.post("/predict", uploadMiddleware, PredictController.predict);
predictRouter.post("/predict-tuned", AuthMiddleware, uploadMiddleware, PredictController.predictTuned);






