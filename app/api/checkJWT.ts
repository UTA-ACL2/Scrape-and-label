'use server'
import { clear } from 'console';
import jwt from 'jsonwebtoken';

// Function to check if a token is valid
const checkToken = (token:string) => {
    try {
        const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }
        // Verify the token
        jwt.verify(token,secret);

        // If the token is valid, return true
        return true;
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        }
        // If the token is invalid, return false
        return false;
    }clear
};

export default checkToken;