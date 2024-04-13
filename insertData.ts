// File: insertData.ts

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs';
import path from 'path';

async function insertData() {
  const db = await open({ filename: './app/localhost.db', driver: sqlite3.Database });

  const query = `
    CREATE TABLE IF NOT EXISTS items(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      thumbnails TEXT,
      duration TEXT,
      viewCount TEXT,
      channel TEXT,
      video_id TEXT,
      status TEXT DEFAULT 'incomplete',
      label TEXT DEFAULT 'none'
    );
  `;

  await db.exec(query);

  // Read items.json
  const itemsJsonPath = path.join(process.cwd(), './items.json');
  const itemsJson = fs.readFileSync(itemsJsonPath, 'utf-8');
  const items = JSON.parse(itemsJson);

  // Insert unique items into the database
  const uniqueItems = Array.from(new Set(items.map((item: any) => item.video_id))).map(video_id => {
    return items.find((item: any) => item.video_id === video_id)
  });

  for (const item of uniqueItems) {
    console.log("Inserting item: ", item)
    let { title, thumbnails, duration, viewCount, channel, video_id } = item;
    thumbnails = thumbnails[thumbnails.length - 1].url; // Get the highest resolution thumbnail [1080p thumbnail]
    channel = channel.name;
    await db.run(`INSERT INTO items (title, thumbnails, duration, viewCount, channel, video_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, thumbnails, duration, viewCount, channel, video_id, "incomplete"]
    );
  }

  await db.close();
  console.log('Database initialized successfully');
}

insertData().catch(console.error);