import { AppError } from "../AppError";

export class InvalidPasswordError extends AppError {
    constructor(message: string) {
        super(message, 401);
    }
}