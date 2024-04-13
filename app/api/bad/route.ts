import {NextResponse} from 'next/server';
import sqlite3 from 'sqlite3';
import {open} from 'sqlite';


export async function POST(req: Request) {
    const db = await open({filename: '../../localhost.db', driver: sqlite3.cached.Database});
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
        await db.run(`UPDATE items SET label = 'bad', status="complete" WHERE video_id = ?`, [video_id]);
        const items = await db.all('SELECT * FROM items where status="incomplete"');
        await db.close();
        return  NextResponse.json({ message: items }, { status: 200 });
}