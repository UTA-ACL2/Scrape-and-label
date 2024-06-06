import User from '@/models/userModel';
import ItemModel from '@/models/itemModel';
import keywords from '@/models/keywordModel';
import {ObjectId} from 'mongodb';
import getDatabase from "@/database/database";
import keywordGroupModel from '@/models/keywordGroupModel';
import items from '@/items.json';
export async function add_items() {
    try{
    await getDatabase();
    console.log("started")
    // Read items from items.json

    // Use provided userId and keywordId
    const userId = '66566a47025859a9679691cf';
    const keywordId = '665df0465cc1b37cb50df4be';

    const existingUser = await User.findOne({
        _id: new ObjectId(userId)
    });

    if (!existingUser) {
        return({
            message: 'User does not exists'
        });
    }

    const keywordobject = await keywords
        .findOne({
        _id: new ObjectId(keywordId)
    })
        .populate({
            path: 'superset',
            model: keywordGroupModel
        });

    if (!keywordobject) {
        return ({
            message: 'Keyword does not exists'
        });
    }
    // Use for...of loop to handle async operations
    // Create an array to hold the new items
    let newItems:Array<any> = [];
    let total_length = (items as Array<any>).length;
    console.log(total_length);
    // Use for...of loop to handle async operations
    for (const item of items as Array<any>) {

        const newItem:any = {
            title: item.title,
            thumbnails: item.thumbnails[item.thumbnails.length - 1].url,
            duration: item.duration,
            viewCount: item.viewCount,
            channel: item.channel.name,
            video_id: item.video_id,
            keyword: keywordobject._id,
            createdBy: existingUser._id,
            keywordGroup: keywordobject.superset._id,
            keywordGroupValue: keywordobject.superset.keyword,
        };
        newItems.push(newItem);
        console.log(total_length--)
    }
    console.log("finished adding items")
    // If there are new items, insert them all at once
    if (newItems.length > 0) {
        try {
            console.log("before bulk insert")
            let result = await ItemModel.insertMany(newItems, { ordered: false });
            console.log(result)
        } catch (error) {
            console.log(error);
        }
    }

    console.log("done adding items")
    } catch (error) {
        console.log(error);
        return false;
    }
}