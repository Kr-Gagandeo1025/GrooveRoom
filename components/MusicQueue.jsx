"use client"
import React, { useEffect, useState } from 'react'
import { FaMusic } from 'react-icons/fa6'
import MusicQueueCard from './MusicQueueCard'
import { supabase } from '@/utils/supabase/supabaseClient'
import { useData } from '@/providers/DataContext'

const MusicQueue = () => {
  const {roomId} = useData();
  const [musicQueue,setMusicQueue] = useState([]);
  const GetMusicQueue = async () =>{
    try{
        const response = await fetch("/api/get-music-queue",{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                room_id:roomId,
            }),
        })
        const result = await response.json();
        console.log(result);
        setMusicQueue(result.message);
    }catch(error){
        console.log(error);
    }
}

  useEffect(()=>{
    GetMusicQueue();
    const subscription = supabase.channel('music_queue_changes').on('postgres_changes',
      {event:'INSERT',schema:'public',table:'musicqueuedata',filter:`song_room_id=eq.${roomId}`},
      (payload)=>{
        console.log('Music Queued:',payload.new);
        setMusicQueue((prevMusicQueue)=>[...prevMusicQueue,payload.new]);
      }
    ).subscribe();
  },[])

  return (
    <div className="h-full flex p-2 items-start justify-start flex-col bg-gray-800 w-full rounded-xl">
      <span className='text-2xl flex w-full items-center gap-3'>Music Queue <FaMusic/></span>
      <div className='flex w-full flex-col justify-start items-center'>
      {musicQueue.length!==0&&musicQueue.map((queue,key)=>(
        <MusicQueueCard data={queue} key={key}/>
      ))}
      </div>
    </div>
  )
}

export default MusicQueue
