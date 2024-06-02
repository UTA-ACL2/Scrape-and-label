'use server'
// this route will keep the database connection alive
import {NextResponse, NextRequest} from 'next/server';
import getDatabase from "@/database/database";

export async function GET(req: NextRequest) {
    // Your function logic here
    await getDatabase();
    return NextResponse.json({ message: 'DB started successfully' }, { status: 200 });
}
