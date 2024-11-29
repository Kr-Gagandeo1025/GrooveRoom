// fetch the room details
import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/supabaseClient";
import {auth} from "@clerk/nextjs/server";

export async function POST(req) {
    if(req.method !== "POST"){
        return NextResponse.json({"message":"Method Not Allowed","status":500});
    }
    const BodyData = await req.json();

    try{
        const {userId,getToken} = auth();
        console.log(userId);
        const token = await getToken();
        if(!userId || !token){
            return NextResponse.json({'message':'user not authenticated','status':400});
        }
        const {data,error} = await supabase.from('roomsdata').select('*').eq('id',BodyData.roomId);

        if(error){
            return NextResponse.json({'message':'Error Fetching Rooms','status':500});
        }

        return NextResponse.json({'message':data,'status':200});
    }catch(error){
        console.log(error);
        return NextResponse.json({'message':'internal server error','status':500});
    }
}