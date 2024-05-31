import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import ItemModel from '@/models/itemModel';
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

    let scraped_result = await scrape(Cookie, keywordobject.keyword, 4000);
    if(scraped_result?.items && scraped_result.items.length > 0){
        scraped_result.items.forEach(async (item) => {
            // Check if the item already exists in the database
            const existingItem = await ItemModel.findOne({ video_id: item.video_id });

            // If the item does not exist, save it
            if (!existingItem) {
                const newItem = new ItemModel({
                    title: item.title,
                    thumbnails: item.thumbnails[item.thumbnails.length-1].url,
                    duration: item.duration,
                    viewCount: item.viewCount,
                    channel: item.channel.name,
                    video_id: item.video_id,
                    keyword: keywordobject._id,
                    createdBy: existingUser._id,
                });
                await newItem.save();
            }
        });
        return NextResponse.json({ message: `Scrapped : ${scraped_result?.length} videos!` });
    }
    // Create a new user
    // console.log(existingUser, keywordobject.superset.keyword)

    return NextResponse.json({ message: 'Scrapped' });
}