import { NextResponse } from 'next/server';
import Item from '../../../models/itemModel';
import { authenticateToken, NextRequestWithUser } from '../jwtMiddleware';

export async function POST(req: NextRequestWithUser) {
    try {
        const authResponse = await authenticateToken(req);
        if (authResponse.status !== 200) {
            return authResponse;
        }
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
        await Item.updateOne({ video_id }, { label: 'good', status: 'complete' });
        const items = await Item.find({ status: 'incomplete' });
        return NextResponse.json({ message: items }, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "error" });
    }
}