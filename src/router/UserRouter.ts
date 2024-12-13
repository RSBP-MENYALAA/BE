import { Router } from "express";
import { UserController } from "../controller/UserController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export const userRouter = Router();

userRouter.post("/register", UserController.register);
userRouter.get("/me", AuthMiddleware, UserController.get);


