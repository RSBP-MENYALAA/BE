import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { successResponse, errorResponse } from "../utils/api-response";
import { ResponseError } from "../error/ResponseError";
import { UploadRequest } from "../model/UploadModel";
import { UploadService } from "../service/UploadService";
import { PredictService } from "../service/PredictService";

export class PredictController {
  static async predict(req: Request, res: Response): Promise<void> {
    try {
      const data: UploadRequest = {
        file: req.file as Express.Multer.File,
      };

      const predictReq = await UploadService.handleFileUpload(data);
      const result = await PredictService.predict(predictReq);
      successResponse(res, StatusCodes.OK, "Predict successful", result);
    } catch (error) {  
      if (error instanceof ResponseError) {
        errorResponse(res, error);
      } else {
        errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
      }
    }
  }

  static async predictTuned(req: Request, res: Response): Promise<void> {
    try {
      const data: UploadRequest = {
        file: req.file as Express.Multer.File,
      };

      const predictReq = await UploadService.handleFileUpload(data);
      const result = await PredictService.predictTuned(predictReq);
      successResponse(res, StatusCodes.OK, "Predict successful", result);
    } catch (error) {  
      if (error instanceof ResponseError) {
        errorResponse(res, error);
      } else {
        errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
      }
    }
  }
}