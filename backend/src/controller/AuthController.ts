import { Request, Response } from 'express';
import {RegisterUserDto} from "../dtos/RegisterUserDto";
import {loginUser, registerUser} from "../service/AuthService";
import {LoginUserDto} from "../dtos/LoginUserDto";
import { UserAlreadyExistsError } from "../error/user/UserAlreadyExistsError";
import { UserNotFoundError } from "../error/user/UserNotFoundError";
import { InvalidPasswordError } from "../error/user/InvalidPasswordError";

export const userRegistration = async (req: Request, res: Response)=> {

    try {
        // take the payload/dto from request sent
        const payload: RegisterUserDto = req.body;

        // service method
        const user = await registerUser(payload);

        return res.status(201).json({
            message: "User Registered Successfully",
            userId: user
        });
    } catch (error) {
        console.error("Registration failed:", error);

        if (error instanceof UserAlreadyExistsError) {
            return res.status(409).json({ message: error.message });
        }

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const userLogin = async (req: Request, res: Response)=> {

    try {

        const payload: LoginUserDto = req.body;

        const token =  await loginUser(payload);

        return res.status(200).json({
            message: "Logged In Successfully",
            token: token
        });
    } catch (error) {
        console.error("Login failed:", error);

        if (error instanceof UserNotFoundError) {
            return res.status(404).json({ message: error.message });
        }

        if (error instanceof InvalidPasswordError) {
            return res.status(401).json({ message: error.message });
        }

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}