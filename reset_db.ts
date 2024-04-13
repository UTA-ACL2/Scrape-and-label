import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(__dirname, './app/localhost.db');

fs.unlink(dbPath, (err) => {
    if (err) {
        console.error("Failed to delete database: " + err);
    } else {
        console.log("Successfully deleted database.");
    }
});