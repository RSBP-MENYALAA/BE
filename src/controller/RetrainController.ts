import { Request, Response } from "express";
import { ResponseError } from "../error/ResponseError";
import { errorResponse, successResponse } from "../utils/api-response";
import { StatusCodes } from "http-status-codes";
import { RetrainRequest } from "../model/RetrainModel";
import { UploadRequest } from "../model/UploadModel";
import { RetrainService } from "../service/RetrainService";

export class RetrainController {
    static async retrain(req: Request, res: Response){
        try {
            const data : RetrainRequest = {
                imagepath: req.body.imagepath,
                new_class: req.body.new_class
            }

            // simpan sementara data image yang akan di retrain
            const response = await RetrainService.retrain(data)

            successResponse(res, StatusCodes.OK, "Add Retrain Data Successful", response)

        } catch (error) {
            if (error instanceof ResponseError) {
                errorResponse(res, error)
            } else {
                errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"))
            }
        }
    }
}