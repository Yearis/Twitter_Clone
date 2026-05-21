import {RegisterUserDto} from "../dtos/RegisterUserDto";
import {User} from "../models/User";
import {findUserByEmail, findUserByName, saveUser} from "../repository/UserRepository";
import bcrypt from 'bcryptjs';

export const registerUser = async (dto: RegisterUserDto): Promise<String> => {

    // 1st check if the email given by user is already in use
    const existingEmail = await findUserByEmail(dto.email);

    if (existingEmail) throw new UserAlreadyExists("Email already in use");

    // 2nd check username
    const existingUsername = await findUserByName(dto.username);

    if (existingUsername) throw new UserAlreadyExists("Username already taken");

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