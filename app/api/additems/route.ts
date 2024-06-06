import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import getDatabase from "@/database/database";
import { add_items } from "@/additems";

export async function GET(request: NextRequest) {
    await getDatabase();
    add_items();
    return NextResponse.json({"done": "done"});
}
