'use server'

import { NextRequest, NextResponse } from 'next/server';
import items from '@/models/itemModel';
import { ObjectId } from 'mongodb';
import Keyword from '@/models/keywordModel';
export async function GET(request: NextRequest) {
    const params = new URLSearchParams(request.nextUrl.search);
    const keywordGroupId = params.get('keywordGroupId');

    if (!keywordGroupId) {
        return NextResponse.json({ message: 'keywordGroupId is not provided' });
    }

    const keywordGroup = new ObjectId(keywordGroupId); // replace keywordGroupId with the actual id

    // Find the keywords that belong to the KeywordGroup
    const keywords = await Keyword.find({ superset: keywordGroup }).select('_id');
    console.log(keywords)
    // Extract the ids from the keyword documents
    const keywordIds = keywords.map(keyword => keyword._id);

    // Find the items that have those keywords
    const allItems = await items.find({ keyword: { $in: keywordIds } })
        .populate('createdBy', 'username')
        .populate('keyword', 'keyword')
        .populate('assignedTo', 'username');
    const formattedItems = allItems.map((item, index) => ({
        "id": item._id,
        "title": item.title,
        "thumbnails": item.thumbnails,
        "duration": item.duration,
        "viewCount": item.viewCount,
        "channel": item.channel,
        "video_id": item.video_id,
        "keyword": item.keyword.keyword,
        "createdBy": item.createdBy.username,
        "status": item.status,
        "label": item.label,
        "assignedTo": item.assignedTo ? item.assignedTo.username : null,
    }));

    return NextResponse.json(formattedItems);
}