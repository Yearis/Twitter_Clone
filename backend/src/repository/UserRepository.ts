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

// find user by email
export const findUserByEmail = async (email: string): Promise<string> => {

    const userDB = await db
        .collection('users')
        .where('email', '==', email)
        .limit(1) // as email is unique
        .get();

    return userDB.docs[0].id;
}

// find user by username
export const findUserByName = async (username: string): Promise<string> => {

    const userDB = await db
        .collection('users')
        .where('username', '>=', username)
        .where('username', '<=', username + '\uf8ff')
        .get();

    return userDB.docs[0].data().username;
}