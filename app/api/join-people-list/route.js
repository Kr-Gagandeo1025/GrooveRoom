import { NextResponse } from "next/server";
import {auth} from "@clerk/nextjs/server";
import { supabase } from "@/utils/supabase/supabaseClient";

export async function POST(req){ 

    if(req.method !== 'POST'){
        return NextResponse.json({'message':'method not allowed','status':500});
    }
    const Bodydata = await req.json(); 
    console.log(Bodydata); 

    try{
        const {userId,getToken} = auth(); 
        const token = await getToken();
        if(!userId || !token){
            return NextResponse.json({'message':'user not authenticated','status':401});
        }
        
        if(Bodydata){
            const {data, error} = await supabase.from('persondata').insert([{
                id:Bodydata.user_id,
                p_name:Bodydata.p_name,
                in_room_id:Bodydata.in_room_id,
                has_admin_prev:Bodydata.has_admin_prev,
                role:Bodydata.role,
            }],{
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            });

            if(error){
                return NextResponse.json({ message: 'Error Joining Room', error ,'status':500});
            }else{
                const { data, error } = await supabase.rpc('increment_people_count', { room_id: Bodydata.in_room_id });
                if(error){
                    return NextResponse.json({ message: 'Error Joining Room', error ,'status':500});
                }
                return NextResponse.json({ message: 'Room joined successfully', data ,'status':200});
            }
        }
    }catch(error){
        console.log(error);
        return NextResponse.json({message:'Internal Server Error',error,'status':500});
    }
}