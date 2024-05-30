import { NextRequest, NextResponse } from 'next/server';
import keywords from '@/models/keywordModel';

export async function POST(request: NextRequest) {
    try{
    const body = await request.json();
    const {keyword} = body;
    if (!keyword) {
        return NextResponse.json({ message: 'Keyword to add is not provided' });
    }

    const newKeyword = new keywords({ keyword: keyword });
    await newKeyword.save();

    return NextResponse.json({ message: 'Keyword added successfully' });
} catch (error:any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
}
}