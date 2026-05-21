class UserAlreadyExists extends AppError {
    constructor(message: string) {
        super(message, 409);
    }
}