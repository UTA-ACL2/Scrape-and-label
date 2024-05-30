import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const {
        username,
        password,
        role,
    } = body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Create a new user
    const user = new User({ username, password, role });
    await user.save();

    return NextResponse.json({ message: 'User registered successfully' });
}