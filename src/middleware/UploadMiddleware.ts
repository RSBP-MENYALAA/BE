import { upload } from "../config/multer";
import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/api-response";

const uploadSingle = upload.single("image");

export const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  uploadSingle(req, res, (error: any) => {
    if (error) {
      errorResponse(res, error);
    } else {
      next();
    }
  });
}
  