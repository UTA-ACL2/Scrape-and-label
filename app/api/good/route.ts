import {NextResponse, NextRequest} from 'next/server';
import { ObjectId } from 'mongodb';
import Item from '@/models/itemModel';
import getDatabase from "@/database/database";
import updateEntry from '../updateEntry';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const item = body;
        const {
            _id,
            assignedTo,
        } = item;
        await getDatabase();
        const idObj = ObjectId.createFromHexString(_id); // Convert id to ObjectId
        const userIDObj = ObjectId.createFromHexString(assignedTo); // Convert userID to ObjectId
        await Item.updateOne({ _id: idObj }, { label: 'good', status: 'complete' });
        // Call the updateEntry function to update the user's totalStatusChanges field and return the items assigned to the user
        let items = await updateEntry(userIDObj);
        return NextResponse.json({ message: items }, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "error" });
    }
}