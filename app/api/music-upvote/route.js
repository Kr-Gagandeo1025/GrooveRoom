import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/supabaseClient";
import {auth} from "@clerk/nextjs/server";

export async function POST(req){
    if(req.method !== "POST"){
        return NextResponse.json({"message":"Method Not Allowed","status":500});
    }
    const BodyData = await req.json();

    try{
        const {userId,getToken} = auth();
        const token = await getToken();
        if(!userId || !token){
            return NextResponse.json({'message':'user not authenticated','status':400});
        }
        const {data,error} = await supabase.rpc("increment_upvotes",{musicid : BodyData.musicId});
        if(error){
            console.log(error)
            return NextResponse.json({'message':'error updating upvotes','status':500})
        }
        return NextResponse.json({'message':data,'status':200});
    }catch(error){
        console.log(error);
        return NextResponse.json({'message':'Internal Server Error','status':500});
    }
}