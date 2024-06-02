'use server'

import { NextRequest, NextResponse } from 'next/server';
import keywordGroupModel from '@/models/keywordGroupModel';
import getDatabase from "@/database/database";
export async function GET(request: NextRequest) {
    await getDatabase();
    const allItems = await keywordGroupModel.find({});
    const formattedItems = allItems.map((item, index) => ({
        "id": item._id,
        "name": item.keyword
    }));
     return NextResponse.json(formattedItems);
}