'use server'
import { NextRequest, NextResponse } from 'next/server';
import keyword from '@/models/keywordModel';
import keywordGroupModel from '@/models/keywordGroupModel';

export async function GET(request: NextRequest) {
    const allItems = await keyword.find({}).populate('superset');
    const formattedItems = allItems.map((item, index) => ({
        "id": item._id,
        "name": item.keyword,
        "superset": item.superset ? item.superset.keyword : "N/A",
        "supersetid": item.superset
    }));
    return NextResponse.json(formattedItems);
}