import {
   CreateUserRequest, 
   CreateUserResponse,
   GetUserResponse, 
   } from "../model/UserModel";
import { AuthRequest } from "../model/AuthModel";
import { UserRepository } from "../repository/UserRepository";
import { UserValidation } from "../validation/UserValidation";
import { Validation } from "../utils/validation";
import { ResponseError } from "../error/ResponseError";
import bcrypt from "bcrypt";

export class UserService {

  static async registerUser (request: CreateUserRequest): Promise<CreateUserResponse> {
    const data = Validation.validation(UserValidation.REGISTER, request);

    const userExists = await UserRepository.findByEmail(data.email);

    if (userExists) {
      throw new ResponseError(409, "User already exists");
    }

    const salt: number = parseInt(process.env.SALT_ROUNDS || "");
    data.password = await bcrypt.hash(data.password, salt);

    const user = await UserRepository.create(data.email, data.password, data.name);

    return {
      name: user.name,
      email: user.email,
    };
  }

  static async getUser(auth: AuthRequest): Promise<GetUserResponse> {
    const userId: number = auth.user?.id as number;
    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new ResponseError(404, "Unauthorized!");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}