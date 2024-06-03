export const dynamic = "force-dynamic";
import {NextResponse, NextRequest} from 'next/server';
import User from '@/models/userModel';
import getDatabase from "@/database/database";

export async function GET(req : NextRequest) {
    try {
        await getDatabase();
        const users = await User.find({}, { username: 1, role: 1, totalStatusChanges: 1 }).sort({ totalStatusChanges: -1 });
        return NextResponse.json({message: users});
    } catch (e) {
        console.log(e);
        return NextResponse.json({message: "error"}, {status: 500});
    }
}