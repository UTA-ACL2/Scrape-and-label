import { NextRequest, NextResponse } from 'next/server';
import keywords from '@/models/keywordModel';

export async function DELETE(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const keyword = searchParams.get('keyword');

    if (!keyword) {
        return NextResponse.json({ message: 'Keyword to delete is not provided' });
    }

    const deletedKeyword = await keywords.findOneAndDelete({ keyword: keyword });

    if (!deletedKeyword) {
        return NextResponse.json({ message: 'Keyword not found' });
    }

    return NextResponse.json({ message: 'Keyword deleted successfully' });
}