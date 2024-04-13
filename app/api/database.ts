import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let dbInstance: Database | null = null;

export async function getDatabase(): Promise<Database> {
    const dbPath = path.join(process.cwd(), 'app/localhost.db');
    try {
        if (!dbInstance) {
            dbInstance = await open({ filename: dbPath, driver: sqlite3.Database });
        } else if (!(dbInstance as any).open) { // Check if the database instance is closed
            // Reset dbInstance to null
            dbInstance = null;
            // Recursively call getDatabase to open a new database instance
            return getDatabase();
        };
        return dbInstance;
    } catch (e) {
        console.log("here");
        console.log(e);
        throw e; // Re-throw the error to be handled by the caller
    }
};
