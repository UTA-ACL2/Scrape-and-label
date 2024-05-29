import jwt, {JwtPayload} from 'jsonwebtoken';
import {NextResponse, NextRequest} from 'next/server';

interface UserPayload extends JwtPayload {
    id : string;
};

// Extend the NextRequest type to include a user property
export interface NextRequestWithUser extends NextRequest {
    user?: UserPayload;
}

export async function authenticateToken(request : NextRequestWithUser) {
    const authHeader : string | null = request
        .headers
        .get('authorization');
    const token : string | null = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return NextResponse.json({
            message: 'No token provided'
        }, {status: 401});
    };

    const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    };

    try {
        const user = jwt.verify(token, secret)as UserPayload;
        request.user = user;
        return NextResponse.json({
            message: 'Authenticated'
        }, {status: 200});
    } catch (err) {
        return NextResponse.json({
            message: 'Failed to authenticate token'
        }, {status: 403});
    };
};