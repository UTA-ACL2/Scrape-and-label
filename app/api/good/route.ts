import {NextResponse} from 'next/server';
import sqlite3 from 'sqlite3';
import {open} from 'sqlite';
import path from 'path';


export async function POST(req: Request) {
    const dbPath = path.join(process.cwd(), 'app/localhost.db');
    const db = await open({filename: dbPath, driver: sqlite3.cached.Database});
    const body = await req.json();
        const item =body;
        const {
            title,
            thumbnails,
            duration,
            viewCount,
            channel,
            video_id
        } = item;
        await db.run(`UPDATE items SET label = 'good', status="complete" WHERE video_id = ?`, [video_id]);
        const items = await db.all('SELECT * FROM items where status="incomplete"');
        await db.close();
        return  NextResponse.json({ message: items }, { status: 200 });
}