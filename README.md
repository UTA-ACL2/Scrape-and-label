# Note

- If you are running this for the first time, run `npm run ci` or `npm run i`
- Also install nodejs and typescript in your machine

# Instructions

This application helps you do the following:

- "scrape_youtube_videos.ts" -> Scrape YouTube search results based on a keyword and store the results in "items.json". (Note: You can scrape multiple keywords and duplicates will not be inserted in items.json)

  - Inside "scrape_youtube_videos.ts" add YouTube cookie -> const youtube = new Client({initialCookie:"ADD_YOUR_COOKIE_HERE" });

# To insert items.json to database

- After you have your items.json ready run `npm run insert`
- Then run `npm run dev` to start the data labelling website

# To reset datbase

- npm run resetbd

# To run the label website

 - In development simply do `npm run dev`
 - In production: first run `npm run build` then run `npm run start`