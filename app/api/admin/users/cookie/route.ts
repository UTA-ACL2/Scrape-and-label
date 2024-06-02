import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import getDatabase from "@/database/database";

// Existing GET and POST methods...

export async function GET(request: NextRequest) {
    await getDatabase();
    const params = new URLSearchParams(request.nextUrl.search);
    const userId = params.get('userId');

    const user = await User.findById(userId);
    if (user) {
        return NextResponse.json({ cookie: user.youtubeCookie });
    }
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
}

export async function POST(request: NextRequest) {
    await getDatabase();
    const { userId, cookie } = await request.json();
    const user = await User.findById(userId);
    if (user) {
        user.youtubeCookie = cookie;
        await user.save();
        return NextResponse.json({ message: 'User cookie updated successfully' });
    }
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
}