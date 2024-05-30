import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import keywords from '@/models/keywordModel';

import { ObjectId } from 'mongodb';
export async function POST(request: NextRequest) {
    const body = await request.json();
    const {
      keyword,userId
    } = body;

    const existingUser = await User.findOne({  _id: new ObjectId(userId as string)  });
    if (!existingUser) {
        return NextResponse.json({ message: 'User does not exists' }, { status: 400 });
    }
    const keywordobject = await keywords.findOne({  _id: new ObjectId(keyword as string)  }).populate('superset');
    if (!keywordobject) {
        return NextResponse.json({ message: 'Keyword does not exists' }, { status: 400 });
    }
    // Create a new user
    // console.log(existingUser, keywordobject.superset.keyword)

    return NextResponse.json({ message: 'Scrapped' });
}