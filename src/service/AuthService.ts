import {
  LoginRequest,
  LoginResponse,
  TokenPayload,
} from "../model/AuthModel";
import { UserRepository } from "../repository/UserRepository";
import { ResponseError } from "../error/ResponseError";
import { Validation } from "../utils/validation";
import { UserValidation } from "../validation/UserValidation";
import bcrypt from "bcrypt";
import { JwtToken } from "../utils/jwtToken";
import { StatusCodes } from "http-status-codes";

export class AuthService {
  static async loginUser(request: LoginRequest): Promise<LoginResponse> {
    const data = Validation.validation(UserValidation.LOGIN, request);

    const user = await UserRepository.findByEmail(data.email);

    if (!user) {
      throw new ResponseError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
    }

    if (!user.password) {
      throw new ResponseError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
    }

    const isPasswordMatch = await bcrypt.compare(data.password, user.password);

    if (!isPasswordMatch) {
      throw new ResponseError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
    }

    const payload: TokenPayload = {
      userId: user.id,
    };

    const token = JwtToken.generateToken(payload);

    return {
      accessToken: token,
    };
  }
}
