"use client"
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { BiSolidUpvote, BiUpvote } from "react-icons/bi";
import { IoMdRemoveCircle } from "react-icons/io";
const MusicQueueCard = ({data}) => {
  const {toast} = useToast();
  const [voteStatus,setVoteStatus] = useState(false);
  const startCooldown = async () => {
    setTimeout(()=>{
      setVoteStatus(false);
    },[30000])
  }
  const handleUpVote = async() => {
    if(voteStatus===false){
      setVoteStatus(true);
      const response = await fetch("/api/music-upvote",{
        method:'POST',
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          musicId : data.music_id
        }),
      })
      startCooldown();
      // const result = await response.json();
      // console.log(result.message);
    }else{
      toast({
        title: "Please wait for Upvote Cooldown! 30 sec",
      })
    }
  }
  return (
    <div className="flex w-full p-3 border-b border-gray-500 justify-between items-center">
      <div className="flex gap-3 text-lg items-center">
      <img
        src={data.song_thumbnail}
        alt={data.song_title}
        className='h-[70px] w-[70px]'
        />
        <span>{data.song_title.slice(0,20)}...</span>
      </div>
      <div className="flex gap-3 items-center">
        <button className="flex gap-1 items-center text-xl" onClick={handleUpVote}>
            {data.upvotes}
            {voteStatus?
            <BiSolidUpvote className="text-green-600 text-3xl"/>:
            <BiUpvote className="text-green-600 text-3xl "/>
            }
        </button>
        <button>
            <IoMdRemoveCircle className="text-red-600 text-3xl "/>
        </button>
      </div>
    </div>
  )
}

export default MusicQueueCard
