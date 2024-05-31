import {NextResponse, NextRequest} from 'next/server';
import { ObjectId } from 'mongodb';
import Item from '@/models/itemModel'; // Import the Mongoose model


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const item = body;
        const {
            _id,
        } = item;
        const idObj = ObjectId.createFromHexString(_id); // Convert id to ObjectId

        // Use Mongoose's findOneAndUpdate method
        await Item.findOneAndUpdate({ _id: idObj }, { label: 'skip', status: 'complete' });

        const items = await Item.find({ status: "incomplete" }); // Use Mongoose's find method
        return NextResponse.json({ message: items }, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "error" });
    }
}