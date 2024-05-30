'use server'

import { NextRequest, NextResponse } from 'next/server';
import keywordGroupModel from '@/models/keywordGroupModel';

export async function GET(request: NextRequest) {
    const allItems = await keywordGroupModel.find({});
    console.log(allItems)
    const formattedItems = allItems.map((item, index) => ({
        "id": item._id,
        "name": item.keyword
    }));
     return NextResponse.json(formattedItems);
}