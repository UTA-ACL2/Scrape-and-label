import {NextRequest, NextResponse} from 'next/server';
import keyword from '@/models/keywordModel';
import getDatabase from '@/database/database';
import keywordGroupModel from '@/models/keywordGroupModel';

export const dynamic = 'force-dynamic';

export async function GET(request : NextRequest) {
    try {
        await getDatabase();

        const allItems = await keyword
            .find({})
            .populate('superset', keywordGroupModel);

        const formattedItems = allItems.map((item) => ({
            id: item._id,
            name: item.keyword,
            superset: item.superset
                ? item.superset.keyword
                : 'N/A',
            supersetid: item.superset
                ? item.superset._id
                : 'N/A'
        }));

        return NextResponse.json(formattedItems);
    } catch (error : any) {
        return NextResponse.json({error: error.message});
    }
}
