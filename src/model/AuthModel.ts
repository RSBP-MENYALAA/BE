import { Request } from "express";

export interface User {
  id: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface TokenPayload {
  userId: number;
}

export interface AuthRequest extends Request {
  user: User;
}
