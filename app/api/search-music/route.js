import { NextResponse } from "next/server";

export async function GET(req){
    const {searchParams} = new URL(req.url);
    const query = searchParams.get('query');

    if(!query){
        return NextResponse.json({error:'Search query is required'},{status:400});
    }

    const API_KEY = process.env.NEXT_PUBLIC_YT_API_KEY;

    try{
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${encodeURIComponent(
            query
            )}&part=snippet&type=video&maxResults=5`
        );

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.error.message || "Failed to fetch Music Data");
        }

        return NextResponse.json(data.items, {status:200});
    }catch(error){
        console.error('Error fetching YT Music:',error);
        return NextResponse.json({error:"Internal Server Error"},{status:500});
    }
}