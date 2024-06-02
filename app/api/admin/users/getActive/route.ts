export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import getDatabase from "@/database/database";

export async function GET(request: NextRequest) {
    await getDatabase();
    const users = await User.find({isActive:true}, '-password');
    const formattedItems = users.map((item, index) => ({
        "id": item._id,
        "name": item.username
    }));
    return NextResponse.json(formattedItems);
}
