import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';

export async function GET(request: NextRequest) {
    const users = await User.find({isActive:true}, '-password');
    const formattedItems = users.map((item, index) => ({
        "id": item._id,
        "name": item.username
    }));
    return NextResponse.json(formattedItems);
}
