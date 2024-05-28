import { NextResponse } from 'next/server';
import Item from '../itemModel'; // Import the Mongoose model
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

        // Use Mongoose's findOneAndUpdate method
        await Item.findOneAndUpdate({ video_id: video_id }, { label: 'skip', status: 'complete' });

        const items = await Item.find({ status: "incomplete" }); // Use Mongoose's find method
        return NextResponse.json({ message: items }, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "error" });
    }
}