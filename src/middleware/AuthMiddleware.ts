import { passport } from "../config/passport";
import { errorResponse } from "../utils/api-response";
import { ResponseError } from "../error/ResponseError";
import { Request, Response, NextFunction } from "express";
import { User } from "../model/AuthModel";
import { StatusCodes } from "http-status-codes";

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err: Error, user: User) => {
    if (err || !user) {
      return errorResponse(res, new ResponseError(StatusCodes.UNAUTHORIZED, "Unauthorized!"));
    }

    req.user = user;
    next();
  })(req, res, next);
};