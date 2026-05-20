import {Router} from "express";
import {userRegistration} from "../controller/UserController";

const userRouter = Router();

userRouter.post("/register", userRegistration);

export default userRouter;