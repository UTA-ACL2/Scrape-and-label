import {NextResponse, NextRequest} from 'next/server';
import Item from '@/models/itemModel';
import {ObjectId} from 'mongodb';

export async function GET(req : NextRequest) {
    try {
        const params = new URLSearchParams(req.nextUrl.search);
        const userID = params.get('userID');
        if (!userID) {
            return NextResponse.json({message: "userID is not provided"});
        };
        const userIDObj = ObjectId.createFromHexString(userID); // Convert userID to ObjectId
        const items = await Item.find({assignedTo: userIDObj, status: "incomplete"}); // Use Mongoose's find method
        return NextResponse.json({message: items});
    } catch (e) {
        console.log(e);
        return NextResponse.json({message: "error"});
    }
}