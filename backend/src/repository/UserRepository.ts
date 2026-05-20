import { db } from '../config/firebaseConfig';
import { User } from '../models/User';

export const saveUser = async (user: User): Promise<string> => {

    // refers to our user's table
    const userDB = db.collection('users');

    const userData = {

        username: user.username,
        age: user.age,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt
    };

    // this is document inside firebase DB's user folder
    // it is like a row inside a table
    const userRef = await userDB.add(userData);

    return userRef.id;
}