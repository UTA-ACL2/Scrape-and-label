import { NextResponse } from 'next/server';
import { getDatabase } from '../database';

export async function GET(req: Request) {
    try {
        const db = await getDatabase();
        const items = await (db as any).all('SELECT * FROM items where status="incomplete"');
        return NextResponse.json({ message: items });
    } catch (e) {
        console.log("here")
        console.log(e);
        return NextResponse.json({ message: "error" });
    }
}
