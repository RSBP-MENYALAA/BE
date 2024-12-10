import { ResponseError } from '../error/ResponseError';
import { Response } from 'express'; 
import { StatusCodes } from 'http-status-codes';

export const successResponse = (res: Response, code: number, message: string, data?: any): void => {
  if (data === undefined) {
    res.status(code).json({
      resultCode: code,
      resultMessage: message,
    });
  } else {
    res.status(code).json({
      resultCode: code,
      resultMessage: message,
      data: data,
    });
  }
};

export const errorResponse = (res: Response, error: Error): void => {
  if (error instanceof ResponseError) {
    res.status(error.status).json({
      errorCode: error.status,
      errorMessage: error.message,
    });
  } else {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errorCode: StatusCodes.INTERNAL_SERVER_ERROR,
      errorMessage: "Internal Server Error",
    });
  }
};