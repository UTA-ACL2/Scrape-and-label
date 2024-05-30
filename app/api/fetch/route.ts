import { NextResponse } from 'next/server';
import Item from '../../../models/itemModel';
import { authenticateToken, NextRequestWithUser } from '../jwtMiddleware';

export async function GET(req: NextRequestWithUser) {
    try {
        const authResponse = await authenticateToken(req);
        if (authResponse.status !== 200) {
            return authResponse;
        }
        const items = await Item.find({ status: "incomplete" }); // Use Mongoose's find method
        return NextResponse.json({ message: items });
    } catch (e) {
        console.log("here")
        console.log(e);
        return NextResponse.json({ message: "error" });
    }
}