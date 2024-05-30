import jwt from 'jsonwebtoken';

export async function generateToken(user: any) {
    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }
    let token = jwt.sign({ id: user._id }, secret, { expiresIn: '1d' });
    return token
}