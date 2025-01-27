import { NextResponse } from "next/server";
import {auth} from "@clerk/nextjs/server";
import { supabase } from "@/utils/supabase/supabaseClient";

export async function POST(req){
    if(req.method !== 'POST'){
        return NextResponse.json({'message':'method not allowed','status':500});
    }
    const BodyData = await req.json();
    
    try{
        const {userId,getToken} = auth();
        const token = await getToken();
        if(!userId || !token){
            return NextResponse.json({'message':'user not authenticated','status':401});
        }

        if(BodyData){
            // delete the songs that were in the room
            const {data:deletedSongs,error:songError} = await supabase.from('musicqueuedata').delete().eq('song_room_id',BodyData.roomId);
            if(songError){
                return NextResponse.json({ message: 'Error Deleting Room' ,error,'status':500});
            }
            const {data,error}  = await supabase.from('roomsdata').delete().eq('id', BodyData.roomId);
            if(error){
                return NextResponse.json({ message: 'Error Deleting Room' ,error,'status':500});
            }
            return NextResponse.json({ message: 'Room Deleted Successfully',data,'status':200});
        }
    }catch{
        console.log(error);
        return NextResponse.json({message:'Internal Server Error','status':500});
    }
}