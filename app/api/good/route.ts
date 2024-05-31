import {NextResponse, NextRequest} from 'next/server';
import { ObjectId } from 'mongodb';
import Item from '@/models/itemModel';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const item = body;
        const {
            _id,
            title,
            thumbnails,
            duration,
            viewCount,
            channel,
            video_id
        } = item;
        const idObj = ObjectId.createFromHexString(_id); // Convert id to ObjectId

        await Item.updateOne({ _id: idObj }, { label: 'good', status: 'complete' });
        const items = await Item.find({ status: 'incomplete' });
        return NextResponse.json({ message: items }, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "error" });
    }
}