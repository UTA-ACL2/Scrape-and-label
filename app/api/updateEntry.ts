import { ObjectId } from 'mongodb';
import Item from '@/models/itemModel';
import User from '@/models/userModel';
import getDatabase from "@/database/database";


const updateEntry = async (userIDObj:ObjectId) => {
    await getDatabase();
    const items = await Item.find({ assignedTo: userIDObj, status: 'incomplete' });
    await User.updateOne(
        { _id: userIDObj },
        { $inc: { totalStatusChanges: 1 } }
    );
    return items;
}

export default updateEntry;


