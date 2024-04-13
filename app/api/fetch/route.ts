import { NextResponse ,NextRequest} from "next/server";
import sqlite3 from 'sqlite3';
import {open} from 'sqlite';
import path from 'path';

export async function GET(req: Request) {
    try{
    const dbPath = path.join(process.cwd(), 'app/localhost.db');
    const db = await open({filename: dbPath, driver: sqlite3.Database});
        const items = await (db as any).all('SELECT * FROM items where status="incomplete"');
        db.close();
        return NextResponse.json({message: items});
    } catch(e) {
        console.log(e)
        return NextResponse.json({message: "error"});
    }
}