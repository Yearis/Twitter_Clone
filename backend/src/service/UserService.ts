import {RegisterUserDto} from "../dtos/RegisterUserDto";
import {User} from "../models/User";
import {saveUser} from "../repository/UserRepository";
import bcrypt from 'bcryptjs';

export const registerUser = async (dto: RegisterUserDto): Promise<String> => {

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