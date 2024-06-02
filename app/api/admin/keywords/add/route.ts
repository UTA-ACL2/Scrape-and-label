import { NextRequest, NextResponse } from 'next/server';
import keywords from '@/models/keywordModel';
import getDatabase from "@/database/database";

export async function POST(request: NextRequest) {
    try{
    const body = await request.json();
    const {keyword, keywordGroupId} = body;
    if (!keyword || !keywordGroupId) {
        return NextResponse.json({ message: 'Keyword or KeywordGroupId not provided' });
    }

    await getDatabase();
    const newKeyword = new keywords({ keyword: keyword, superset: keywordGroupId});
    await newKeyword.save();

    return NextResponse.json({ message: 'Keyword added successfully' });
} catch (error:any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
}
}