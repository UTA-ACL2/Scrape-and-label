'use server'
import { clear } from 'console';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import userSchema from './userModel';
// Function to check if a token is valid
export async function checkToken  (token:string) {
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
    };
};

export default checkToken;



export async function getUserFromToken(token: string) {
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }

    // Verify the token and get the user ID
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    const userId = decoded.id;

    // Get the user record from the database
    return userSchema.findById(userId);
}