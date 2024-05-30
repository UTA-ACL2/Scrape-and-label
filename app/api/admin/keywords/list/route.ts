'use server'

import { NextRequest, NextResponse } from 'next/server';
import keyword from '@/models/keywordModel';

export async function GET(request: NextRequest) {
    const allItems = await keyword.find({});
    const formattedItems = allItems.map((item, index) => ({
        "id": index + 1,
        "name": item.keyword
    }));
    console.log(formattedItems)
    return NextResponse.json(formattedItems);
}