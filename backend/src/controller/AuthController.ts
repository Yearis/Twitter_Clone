import { Request, Response } from 'express';
import {RegisterUserDto} from "../dtos/RegisterUserDto";
import {registerUser} from "../service/UserService";

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
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}