import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserService } from "../service/UserService";
import { CreateUserRequest } from "../model/UserModel";
import { successResponse, errorResponse } from "../utils/api-response";
import { ResponseError } from "../error/ResponseError";
import { AuthRequest } from "../model/AuthModel";

export class UserController {
  static async register(req: Request, res: Response) {
    try {
      const userReq = req.body as CreateUserRequest;
      const userRes = await UserService.registerUser(userReq);

      successResponse(res, StatusCodes.CREATED, "user created successfully", userRes);
    } catch (error) {
      if (error instanceof Error) {
        errorResponse(res, error);
      } else {
        errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
      }
    }
  };

  static async get (req: Request, res: Response) {
    try {
      const getReq = req as AuthRequest;
      const response = await UserService.getUser(getReq);
      successResponse(res, 200, "Success Getting User", response);
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError (500, 'Internal Server Error'));
      }
    }
  };
};
