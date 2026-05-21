import {Router} from "express";
import {userRegistration} from "../controller/AuthController";

const userRouter = Router();

userRouter.post("/register", userRegistration);

export default userRouter;