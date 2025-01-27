"use client"
import React, { useEffect, useState } from 'react'
import { FaMusic } from 'react-icons/fa6'
import MusicQueueCard from './MusicQueueCard'
import { supabase } from '@/utils/supabase/supabaseClient'
import { useData } from '@/providers/DataContext'
import { GrPowerReset } from "react-icons/gr";

const MusicQueue = () => {
  const {roomId} = useData();
  const [musicQueue,setMusicQueue] = useState([]);
  const [resetSpinner,setResetSpinner] = useState(false);
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
        // console.log('Music Queued:',payload.new);
        setMusicQueue((prevMusicQueue)=>[...prevMusicQueue,payload.new]);
      }
    ).on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'musicqueuedata',
        filter: `song_room_id=eq.${roomId}`,
      },
      (payload) => {
        console.log('Music Removed:', payload.old);
        setMusicQueue((prevMusicQueue) =>
          prevMusicQueue.filter((track) => track.music_id !== payload.old.music_id)
        );
      }
    ).on('postgres_changes',
      {event:'UPDATE',schema:'public',table:'musicqueuedata',filter:`song_room_id=eq.${roomId}`},
      (payload)=>{
        // console.log('Music Upvoted:',payload.new);
        updateQueueVotes(payload);
      }
    ).subscribe();
   
  },[])
  const updateQueueVotes = (payload) => {
    setMusicQueue((prevData)=>
      prevData.map((music)=>(music.music_id === payload.new.music_id ? payload.new : music))
    )
  }

  const resetVotes = async () => {
    setResetSpinner(true);
    try{
      const response = await supabase.from('musicqueuedata').update({upvotes:0}).eq('song_room_id',roomId);
      if(response.error){
        throw new Error('Error resetting votes');
      }
    }catch(error){
      console.log(error);
    }finally{
      setResetSpinner(false);
    }
  }
  // useEffect(()=>{
  //   const subscription2 = supabase.channel('music_queue_upvotes').on('postgres_changes',
  //     {event:'UPDATE',schema:'public',table:'musicqueuedata',filter:`song_room_id=eq.${roomId}`},
  //     (payload)=>{
  //       console.log('Music Upvoted:',payload.new);
  //       updateQueueVotes(payload);
  //     }
  //   ).subscribe();
  // },[])

  return (
    <div className="h-full flex p-2 items-start justify-start flex-col bg-gray-800 w-full rounded-xl">
      <div className='text-xl flex w-full items-center justify-between px-2'>
        <span className='flex items-center gap-3'>Music Queue <FaMusic/></span>
        <button className={`text-2xl ${resetSpinner?'animate-spin disabled:':''}`} onClick={resetVotes}><GrPowerReset/></button>
      </div>
      <div className='flex w-full flex-col justify-start items-center'>
      {musicQueue.length!==0&&musicQueue.map((queue,key)=>(
        <MusicQueueCard data={queue} key={key}/>
      ))}
      </div>
    </div>
  )
}

export default MusicQueue;
