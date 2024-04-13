
import { NextResponse ,NextRequest} from "next/server";
import sqlite3 from 'sqlite3';
import {open} from 'sqlite';

export async function GET(req: Request) {
    try{
    const db = await open({filename: '../../localhost.db', driver: sqlite3.Database});
        const items = await (db as any).all('SELECT * FROM items where status="incomplete"');
        db.close();
        return NextResponse.json({message: items});
    } catch(e) {
        console.log(e)
        return NextResponse.json({message: "error"});
    }
}