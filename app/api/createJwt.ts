import jwt from 'jsonwebtoken';

export function generateToken(user: any) {
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign({ id: user._id }, secret, { expiresIn: '1d' });
}