import { Client } from "youtubei";
import fs from 'fs';
import {scrape} from "./scrape";
interface VideoItem {
    title: string;
    thumbnails: any[];
    duration: string;
    viewCount: number;
    channel: {
        name: string;
    };
    video_id: string;
}



const start_scraping = async () =>{
    const youtube = new Client({
        initialCookie:"fq7iz3OUlpIQUfEq/A9IQEGxkBcIyLNj8m"
    });
    let videos_count = 4000; // Number of videos you want to scrape from the search result.
    
    // Array of popular dog breeds
    let popularDogBreeds = ["Labrador Retriever", "Golden Retriever", "German Shepherd", "French Bulldog", "Poodle", "Siberian Husky", "Bulldog", "Beagle", "Boxer", "Dachshund", "Yorkshire Terrier", "Shih Tzu", "Rottweiler", "Australian Shepherd", "Border Collie"];

    // Additional popular dog breeds to add
    let additionalDogBreeds = ["Pomeranian", "Corgi", "Chihuahua", "Great Dane", "Basset Hound", "Doberman Pinscher", "Bernese Mountain Dog", "Cavalier King Charles Spaniel", "Shetland Sheepdog", "Australian Cattle Dog", "Pug", "Maltese", "Boston Terrier", "English Bulldog"];

    // Concatenating additional dog breeds with the original array
    popularDogBreeds = popularDogBreeds.concat(additionalDogBreeds);

    // Adding " vlog" after each dog breed
    let popularDogBreedsWithVlog = popularDogBreeds.map(breed => breed);

    const filePath = `items.json`;
    
    for (const keyword of popularDogBreedsWithVlog) {
        let result = await scrape(youtube, keyword, videos_count);

        // 1. Read the JSON file and store all the videoUrls in an array
        let videoUrls: string[] = [];
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify([], null, 2));
        }
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf-8');
            const items = JSON.parse(data);
            videoUrls = items.map((item: any) => item.video_id);
        }

        // 2. Append the next list to the JSON file if it is not empty
        // and make sure to not insert duplicates by checking the video url
        const newItems = result.items.filter((item: VideoItem) => !videoUrls.includes(item.video_id));
        if (newItems.length > 0) {
            const allItems = [...JSON.parse(fs.readFileSync(filePath, 'utf-8')), ...newItems];
            fs.writeFileSync(filePath, JSON.stringify(allItems, null, 2));
        };

        // 3. If the JSON file is empty, write the first list to it
        if (fs.readFileSync(filePath, 'utf-8') === '') {
            fs.writeFileSync(filePath, JSON.stringify(result.items, null, 2));
            console.log(result.length) // this return 20 videos each
        };
        console.log("Finished collection for: " + keyword)
    };
};

// start_scraping();

const calculate_length = () => {

    const filePath = `items.json`;
    const data = fs.readFileSync(filePath, 'utf-8');
    const items = JSON.parse(data);
    console.log(items.length)
}

calculate_length()