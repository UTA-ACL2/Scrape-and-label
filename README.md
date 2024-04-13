# Instructions

This application helps you do the following:

- "scrape_youtube_videos.ts" -> Scrape YouTube search results based on a keyword and store the results in "items.json". (Note: You can scrape multiple keywords and duplicates will not be inserted in items.json)

  - Inside "scrape_youtube_videos.ts" add YouTube cookie const youtube = new Client({initialCookie:"ADD_YOUR_COOKIE_HERE" });
- After you have your items.json ready run npm run insert
- Then run npm run dev to start the data labelling website
gi