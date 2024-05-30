import { NextRequest, NextResponse } from 'next/server';
import keywordGroupModel from '@/models/keywordGroupModel';
// keyword group is the superset of keyword
export async function POST(request: NextRequest) {
    try{
    const body = await request.json();
    const {keywordSuperset} = body;
    if (!keywordSuperset) {
        return NextResponse.json({ message: 'KeywordGroup to add is not provided' });
    }

    const newKeywordGroup = new keywordGroupModel({ keyword: keywordSuperset });
    await newKeywordGroup.save();

    return NextResponse.json({ message: 'KeywordGroup added successfully' });
} catch (error:any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
}
}