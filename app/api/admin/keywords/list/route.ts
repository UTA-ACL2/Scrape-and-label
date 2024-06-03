export const dynamic = "force-dynamic";
import {NextRequest, NextResponse} from 'next/server';
import keyword from '@/models/keywordModel';
import getDatabase from "@/database/database";
import keywordGroupModel from '@/models/keywordGroupModel';

export async function GET(request : NextRequest) {
    try {

        await getDatabase();
        keyword
            .find({})
            .populate('superset', keywordGroupModel)
            .exec()
            .then(allItems => {
                const formattedItems = allItems.map((item, index) => ({
                    "id": item._id,
                    "name": item.keyword,
                    "superset": item.superset
                        ? item.superset.keyword
                        : "N/A ",
                    "supersetid": item.superset
                }));
                return NextResponse.json(formattedItems);
            })
            .catch((error:any) => {
                return NextResponse.json({error: error.message});
            });
            return NextResponse.json([]);
    } catch (error:any) {
        return NextResponse.json({error: error.message});
    }
}