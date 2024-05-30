'use server'
// this route will keep the database connection alive
import { NextApiRequest, NextApiResponse } from 'next';
import {getDatabase} from "@/database/database";
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest , res: NextApiResponse) {
    // Your function logic here
    await getDatabase();
    return NextResponse.json({ message: 'DB started successfully' }, { status: 200 });
}
