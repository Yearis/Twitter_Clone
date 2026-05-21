import {IsEmail, Matches, Min} from "class-validator";

export class RegisterUserDto {
    username!: string;

    @Min(13, {
        message: "User must be at least 13 years old"
    })
    age!: number;

    @IsEmail({}, {
        message: "Invalid email format"
    })
    email!: string;

    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
            message: "Password must contain uppercase, lowercase, number and special character"
        })
    password!: string;
}