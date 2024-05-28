import { NextResponse } from 'next/server';
import Item from '../itemModel';

export async function GET(req: Request) {
    try {
        const items = await Item.find({ status: "incomplete" }); // Use Mongoose's find method
        return NextResponse.json({ message: items });
    } catch (e) {
        console.log("here")
        console.log(e);
        return NextResponse.json({ message: "error" });
    }
}