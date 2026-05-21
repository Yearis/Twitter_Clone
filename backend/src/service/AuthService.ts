import {RegisterUserDto} from "../dtos/RegisterUserDto";
import {User} from "../models/User";
import {existsByEmail, existsByUsername, findUserByEmail, findUserByName, saveUser} from "../repository/UserRepository";
import bcrypt from 'bcryptjs';
import {LoginUserDto} from "../dtos/LoginUserDto";
import {generateToken} from "./JWTService";

export const registerUser = async (dto: RegisterUserDto): Promise<String> => {

    // 1st check if the email or username given by user is already in use
    if (await existsByEmail(dto.email) || await existsByUsername(dto.username)) {

        throw new UserAlreadyExistsError("Email or username already taken");
    }

    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(dto.password, saltRound);

    const newUser = new User(
        dto.username,
        dto.age,
        dto.email,
        hashedPassword,
        new Date()
    );

    return await saveUser(newUser);
}

export const loginUser = async (dto: LoginUserDto): Promise<string> => {

    // we check the credentials
    const user = await findUserByEmail(dto.email);

    if (user === null) throw new UserNotFoundError("User doesnt exists");

    const isPasswordCorrect = await bcrypt.compare(
        dto.password,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new InvalidPasswordError("password is incorrect")
    }

    return generateToken(dto.email);
}