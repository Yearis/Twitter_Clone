import { AppError } from "../AppError";

export class UserNotFoundError extends AppError {
    constructor(message: string) {
        super(message, 404);
    }
}
