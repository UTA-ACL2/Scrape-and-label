import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import keywords from '@/models/keywordModel';
import { scrape } from '../../scrape';

import { ObjectId } from 'mongodb';
export async function POST(request: NextRequest) {
    const body = await request.json();
    const {
        keyword,userId,Cookie
    } = body;

    const existingUser = await User.findOne({  _id: new ObjectId(userId as string)  });
    if (!existingUser) {
        return NextResponse.json({ message: 'User does not exists' }, { status: 400 });
    }
    const keywordobject = await keywords.findOne({  _id: new ObjectId(keyword as string)  }).populate('superset');
    if (!keywordobject) {
        return NextResponse.json({ message: 'Keyword does not exists' }, { status: 400 });
    }

    let scraped_result = await scrape(Cookie, keywordobject.keyword, 100);
    console.log(scraped_result)
    // Create a new user
    // console.log(existingUser, keywordobject.superset.keyword)

    return NextResponse.json({ message: 'Scrapped' });
}