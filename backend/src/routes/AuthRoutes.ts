import {Router} from "express";
import {userLogin, userRegistration} from "../controller/AuthController";

const userRouter = Router();

userRouter.post("/register", userRegistration);
userRouter.post("/login", userLogin);

export default userRouter;