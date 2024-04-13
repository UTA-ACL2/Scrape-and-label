import { Client, SearchResult, VideoCompact } from "youtubei";


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
function delay(ms: number) {
    const randomDelay = ms + Math.floor(Math.random() * ms);
    return new Promise(resolve => setTimeout(resolve, randomDelay));
};

export const scrape = async (youtube: any, keyword: string, videos_count: number) => {
    try {
        let result: SearchResult<"video"> = await youtube.search(`${keyword}`, {
            type: "video",
        });
        let allItems: VideoItem[] = result.items.map((item: VideoCompact) => ({
            title: item.title,
            thumbnails: item.thumbnails,
            duration: `${item.duration}`,
            viewCount: item.viewCount || 0,
            channel: { name: item?.channel?.name || "" },
            video_id: item.id,
        }));
        
        while (allItems.length < videos_count) {
            console.log(`${allItems.length} : videos collected so far!`)
            const nextItems = await result.next();
            if (!nextItems|| nextItems.length === 0) {
              break;
            }
            const mappedItems: VideoItem[] = nextItems.map((item: VideoCompact) => ({
                title: item.title,
                thumbnails: item.thumbnails,
                duration: `${item.duration}`,
                viewCount: item?.viewCount || 0,
                channel: { name: item?.channel?.name || "" },
                video_id: item.id,

            }));
            allItems = [...allItems, ...mappedItems];
                // Wait for 1 second before making the next request
            await delay(1000);
        }

        return { videos: result, items: allItems, length: allItems.length };
    } catch (error) {
        throw new Error(String(error));
    };
}; 