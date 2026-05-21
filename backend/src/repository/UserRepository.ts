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
export const findUserByEmail = async (email: string): Promise<User | null> => {

    const userDB = await db
        .collection('users')
        .where('email', '==', email)
        .limit(1) // as email is unique
        .get();

    if (userDB.empty) return null;

    const doc = userDB.docs[0];

    return {
        id: doc.id,
        ...doc.data()
    } as User;
}

// find user by username
export const findUserByName = async (username: string): Promise<User | null> => {

    const userDB = await db
        .collection('users')
        .where('username', '>=', username)
        .where('username', '<=', username + '\uf8ff')
        .get();

    if (userDB.empty) return null;

    const doc = userDB.docs[0];

    return {
        id: doc.id,
        ...doc.data()
    } as User;
}

export const existsByEmail = async (email: string): Promise<boolean> => {

    const userDB = await db
        .collection('users')
        .where('email', '==', email)
        .limit(1) // as email is unique
        .get();

    // returns true if not empty else false
    return !userDB.empty;
}

export const existsByUsername = async (username: string): Promise<boolean> => {

    const userDB = await db
        .collection('users')
        .where('username', '==', username)
        .limit(1)
        .get();

    // returns true if not empty else false
    return !userDB.empty;
}