import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthService } from './../service/AuthService';
import { successResponse, errorResponse } from "../utils/api-response";
import { ResponseError } from "../error/ResponseError";
import { AuthRequest, LoginRequest } from "../model/AuthModel";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const loginReq: LoginRequest = {
        email: req.body.email,
        password: req.body.password,
      };
      const response = await AuthService.loginUser(loginReq);

      const resData = {
        accessToken: response.accessToken,
      }

      successResponse(res, StatusCodes.OK, "Login Success", resData);
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError (StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error'));
      }
    }
  }
}
