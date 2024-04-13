import {NextResponse} from 'next/server'


export async function POST(request : Request) {
    const body = await request.json();
    const videoID = body.videoid;
    console.log(videoID)
    return NextResponse.json({message: "Success"});
}