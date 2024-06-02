export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import keyword from '@/models/keywordModel';
import getDatabase from "@/database/database";
import keywordGroupModel from '@/models/keywordGroupModel';

export async function GET(request: NextRequest) {
    await getDatabase();
    const allItems = await keyword.find({}).populate('superset',keywordGroupModel);
    const formattedItems = allItems.map((item, index) => ({
        "id": item._id,
        "name": item.keyword,
        "superset": item.superset ? item.superset.keyword : "N/A",
        "supersetid": item.superset
    }));
    return NextResponse.json(formattedItems);
}