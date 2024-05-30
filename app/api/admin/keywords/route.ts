'use server'

import { NextRequest, NextResponse } from 'next/server';
import items from '@/models/itemModel';
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest) {
    const params = new URLSearchParams(request.nextUrl.search);
    const keyword = params.get('keyword');

    if (!keyword) {
        return NextResponse.json({ message: 'Keyword is not provided' });
    }
    const allItems = await items.find({ _id: new ObjectId(keyword) });
    const formattedItems = allItems.map((item, index) => ({
        id: index + 1,
        name: item.name,
        keyword: item.keyword
    }));

    return NextResponse.json(formattedItems);
}