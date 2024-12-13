import { Router } from "express";
import { AuthController } from "../controller/AuthController";

export const authRouter = Router();

authRouter.post("/login", AuthController.login);


