import { NextResponse } from "next/server";
import {auth} from "@clerk/nextjs/server";
import { supabase } from "@/utils/supabase/supabaseClient";

export async function POST(req){

    if(req.method !== 'POST'){
        return NextResponse.json({'message':'method not allowed','status':500});
    }
    const Bodydata = await req.json();
    // console.log(Bodydata);

    try{
        const {userId,getToken} = auth();
        const token = await getToken();
        if(!userId || !token){
            return NextResponse.json({'message':'user not authenticated','status':401});
        }

        if(Bodydata){
            const {data, error} = await supabase.from('roomsdata').insert([{
                creator_id:Bodydata.user_id,
                room_limit:Bodydata.room_limit,
                room_name:Bodydata.room_name,
                room_desc:Bodydata.room_desc,
            }],{
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            });

            if(error){
                return NextResponse.json({ message: 'Error creating room', error ,'status':500});
            }
            return NextResponse.json({ message: 'Room created successfully', data ,'status':200});
        }
    }catch(error){
        console.log(error);
        return NextResponse.json({message:'Internal Server Error',error,'status':500});
    }
}