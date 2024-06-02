import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import getDatabase from "@/database/database";

export async function GET(request: NextRequest) {
    await getDatabase();
    const users = await User.find({}, '-password');
    return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
    await getDatabase();
    const { userId } = await request.json();
    const user = await User.findById(userId);
    if (user && user.role !== 'usurper') {
        user.isActive = !user.isActive;
        await user.save();
        return NextResponse.json({ message: 'User status updated successfully' });
    }
    return NextResponse.json({ message: 'Cannot update status of usurper' }, { status: 400 });
}