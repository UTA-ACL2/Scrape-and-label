import { NextRequest, NextResponse } from 'next/server';
import User from '../../userModel';
import { authenticateToken } from '../../jwtMiddleware';

// Existing GET and POST methods...

export async function POST(request: NextRequest) {
    const authResponse = await authenticateToken(request);
    if (authResponse.status !== 200) {
        return authResponse;
    }
    const { userId } = await request.json();
    const user = await User.findById(userId);
    if (user) {
        user.isActive = !user.isActive;
        await user.save();
        return NextResponse.json({ message: 'User status updated successfully' });
    }
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
}