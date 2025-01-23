'use client'

import { supabase } from "@/utils/supabase/supabaseClient"
import { useEffect, useRef, useState } from "react"
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa"
import { FaSpinner } from "react-icons/fa6"

const MusicPlayer = ({RoomID}) => {
  const [playerData, setPlayerData] =  useState({});
  const [playerLoading, setPlayerLoading] = useState(false);
  const [playerState, setPlayerState] = useState(false);
  const iframeRef = useRef(null);
  useEffect(()=>{
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      iframeRef.current = new window.YT.Player(iframeRef.current, {
        events: {
          onStateChange: onPlayerStateChange,
        },
      });
    };
  },[])

  useEffect(()=>{
    //supabase subscription
    console.log(RoomID,"useeffect running");
    // get player data from db
    const getPlayerData = async() => {
      const {data:pd,error:pe} = await supabase.from('playerdata').select('*').eq('room_id',RoomID);
      if(pe){
        console.log(pe);
        return;
      }else{
        console.log(pd);
        setPlayerData(pd[0]);
      }
    }
    getPlayerData();
    const subscription1 = supabase.channel('music_player_changes').on('postgres_changes',
      {event:'UPDATE',schema:'public',table:'playerdata',filter:`room_id=eq.${RoomID}`},
      (payload)=>{
        console.log('Player Updated:',payload.new);
        setPlayerData(payload.new);
      }
    )
    subscription1.subscribe();
    // updatePlayerData();
  },[])
  // todo - get the music queue data and set the player data
  const updatePlayerData = async() => {
    const {data:md,error:ed} = await supabase.from('musicqueuedata').select('*').eq('song_room_id',RoomID).order('upvotes',{ascending:false}).limit(1);
    if(ed){
      console.log(ed);
      return;
    }else{
      console.log(md);
      const {data:pld,error:plderr} = await supabase.from('playerdata').update({
        current_track_id:md[0]?.music_id,
        isPlaying:true,
        thumbnail:md[0]?.song_thumbnail,
        title:md[0]?.song_title,
      }).eq('room_id',RoomID);// todo - insert the data we got from the music queue
      if(plderr){
        console.log(plderr);
        return;
      }else{
        console.log(pld)
        return;
      }
    }
  }
  const OnPlayPlayerData = () => {
    // console.log(RoomID);
    setPlayerLoading(true);
    const subscription1 = supabase.channel('music_player_changes').on('postgres_changes',
      {event:'UPDATE',schema:'public',table:'playerdata',filter:`room_id=eq.${RoomID}`},
      (payload)=>{
        console.log('Player Updated:',payload.new);
        setPlayerData(payload.new);
      }
    ).subscribe();
    updatePlayerData();
    sendMessageToIframe('playVideo');
    sendMessageToIframe('playVideo');
    setPlayerLoading(false);
    // todo - set the player data on db to the data we just got
  }
  // todo - create a broadcast for the music player

  // function to set isPlaying to false for the global stop
  // const onPausePlayerData = async() => {
  //   setPlayerLoading(true);
  //   const {data:pld,error:plderr} = await supabase.from('playerdata').update({
  //     isPlaying:false,
  //   }).eq('room_id',RoomID);
  //   if(plderr){
  //     console.log(plderr);
  //     setPlayerLoading(false);
  //     return;
  //   }else{
  //     console.log(pld);
  //     setPlayerLoading(false);
  //     return;
  //   }
  // }

  const sendMessageToIframe = (action) => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: action,
          args: [],
        }),
        '*'
      );
    }
  }

  const playMusic = () => {
    sendMessageToIframe('playVideo');
    setPlayerState(true);
  };

  const pauseMusic = () => {
    sendMessageToIframe('playVideo');
    setPlayerState(false);
  };

  // Function to handle video state changes
  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      console.log('Video has ended');
      updatePlayerData();
    }
  };
// write the next track / update track logic here.

  
  return (
      <div className="flex w-fit items-start justify-center gap-10 px-5 bg-white bg-opacity-15 backdrop-filter backdrop-blur-xl py-2 mt-5 mr-4 rounded-xl">
        {playerData?.thumbnail && <img src={playerData?.thumbnail} className="w-[200px] h-[200px] rounded-lg"/>}
        <div className="flex flex-col h-full justify-start items-start">
          <span className="text-xl font-bold">{playerData?.title?.slice(0,50) || "Click on Play to Start Streaming"}... </span>
          {/* youtube iframe */}
          {!playerData?.isPlaying && <button onClick={OnPlayPlayerData} className="mt-2">
            {!playerLoading?<span className="text-sm text-black cursor-pointer bg-white p-2 rounded-full">Start Global</span>:<FaSpinner className="text-6xl animate-spin"/>}
          </button>
          // :
          // <button className="mt-2" onClick={onPausePlayerData}>
          //   {!playerLoading?<span className="text-sm cursor-pointer text-black bg-white p-2 rounded-full">Stop Global</span>:<FaSpinner className="text-6xl animate-spin"/>}
          // </button>
          }
          {playerData?.isPlaying &&
            <iframe ref={iframeRef} className="w-[0px] h-[0px]" src={`https://www.youtube.com/embed/${playerData?.current_track_id}?enablejsapi=1`} title="Music player YT"  allow="autoplay;"/>
          }
          <span className=" flex mt-10 w-full items-center justify-between">
            {playerState? 
            <button onClick={pauseMusic}>
              <FaPauseCircle className="text-6xl cursor-pointer"/> 
            </button>
              :
            <button onClick={playMusic}>
              <FaPlayCircle className="text-6xl cursor-pointer"/>
            </button>
            }
            <span className="text-xs w-[50%]">
              *start/stop global toggles music for everyone !
              <br />
              *play/pause button toggles local music !
            </span>
          </span>
        </div>
      </div>
  )
}

export default MusicPlayer
