'use server'

import {NextRequest, NextResponse} from 'next/server';
import Item from '@/models/itemModel';
import {ObjectId} from 'mongodb';
import Keyword from '@/models/keywordModel';

export async function POST(request : NextRequest) {
    const { userId, keywordGroupId, assignAmount } = await request.json();
    if (!keywordGroupId || !userId || !assignAmount) {
        return NextResponse.json({message: 'keywordGroupId, userId or assignAmount is not provided'});
    }
    // Convert userId and keywordGroupId to ObjectId
    const userIdObj = ObjectId.createFromHexString(userId);
    const keywordGroupIdObj = ObjectId.createFromHexString(keywordGroupId);

    // Fetch items where assignedTo is not set
    const itemsToAssign = await Item.find(
        { keywordGroup: keywordGroupIdObj, assignedTo: null }
    ).limit(assignAmount);
    console.log(itemsToAssign)
    // Update each item individually
    const promises = itemsToAssign.map(item => {
        item.assignedTo = userIdObj;
        return item.save();
    });

    await Promise.all(promises);

    return NextResponse.json({message: 'Items updated', updatedCount: itemsToAssign.length});
}