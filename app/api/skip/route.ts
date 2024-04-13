import { NextResponse } from 'next/server';
import { getDatabase } from '../database';

export async function POST(req: Request) {
    try {
        const db = await getDatabase();
        const body = await req.json();
        const item = body;
        const {
            title,
            thumbnails,
            duration,
            viewCount,
            channel,
            video_id
        } = item;
        await db.run(`UPDATE items SET label = 'skip', status="complete" WHERE video_id = ?`, [video_id]);
        const items = await db.all('SELECT * FROM items where status="incomplete"');
        return NextResponse.json({ message: items }, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "error" });
    }
}
