import { NextResponse } from 'next/server';
import Item from '../../../models/itemModel';
import { NextRequestWithUser } from '../jwtMiddleware';

export async function GET(req: NextRequestWithUser) {
    try {
        const items = await Item.find({ status: "incomplete" }); // Use Mongoose's find method
        return NextResponse.json({ message: items });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "error" });
    }
}