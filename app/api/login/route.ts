import { NextRequest, NextResponse } from 'next/server';
import User from '../userModel';
import { generateToken } from '../createJwt';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const {
        username,
        password,
    } = body;

    const user = await User.findOne({ username });
    if (!user || !user.validatePassword(password)) {
        return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    const token = await generateToken(user);
    return NextResponse.json({ token:token });
}