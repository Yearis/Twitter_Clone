import jwt from "jsonwebtoken";

export const generateToken = (email: string): string => {

    return jwt.sign(
        { email },
        process.env.JWT_SECRET_KEY as string,
        {
            expiresIn: process.env.EXPIRATION as jwt.SignOptions["expiresIn"]
        }
    );
};

export const verifyToken = (token: string)=> {
    return jwt.verify(
        token,
        process.env.JWT_SECRET_KEY as string
    );
}