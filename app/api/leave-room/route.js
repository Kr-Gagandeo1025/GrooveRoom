// leave-room
import { NextResponse } from "next/server";
import {auth} from "@clerk/nextjs/server";
import { supabase } from "@/utils/supabase/supabaseClient";

export async function POST(req){
    if(req.method !== "POST"){
        return NextResponse.json({'message':'method not allowed','satus':500});
    }
    const Bodydata = await req.json();
    console.log(Bodydata);

    try{
        const {userId, getToken} = auth();
        const token = await getToken();
        if(!userId || !token){
            return NextResponse.json({'message':'user not authenticated','status':401});
        }

        if(Bodydata){
            const {data, error} = await supabase.from('persondata').delete().eq('id',userId);
            if(error){
                return NextResponse.json({'message':'Error deleting Persondata',error,'status':500});
            }
            return NextResponse.json({'message':'Person data deleted Successfully',data,'status':200});
        }
    }catch(error){
        console.log(error);
        return NextResponse.json({message:'Internal Server Error','status':500});
    }
}