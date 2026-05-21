import { AppError } from "../AppError";

export class UserAlreadyExistsError extends AppError {
    constructor(message: string) {
        super(message, 409);
    }
}