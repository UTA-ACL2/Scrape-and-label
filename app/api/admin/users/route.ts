import { NextRequest, NextResponse } from 'next/server';
import User from '../../../../models/userModel';

export async function GET(request: NextRequest) {
    const users = await User.find({}, '-password');
    return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
    const { userId } = await request.json();
    const user = await User.findById(userId);
    if (user && user.role !== 'usurper') {
        user.isActive = !user.isActive;
        await user.save();
        return NextResponse.json({ message: 'User status updated successfully' });
    }
    return NextResponse.json({ message: 'Cannot update status of usurper' }, { status: 400 });
}