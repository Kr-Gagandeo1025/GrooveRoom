'use client'
import { useData } from "@/providers/DataContext";
import Link from "next/link";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { MdOutlinePersonOutline } from "react-icons/md";
import { useRouter } from "next/navigation";

const PartyRooms = ({RoomData}) => {
    const router = useRouter();
    const [joiningSpinner,setJoiningSpinner] = useState(false);
    const [deletingSpinner,setDeletingSpinner] = useState(false);
    const {setRoomData,roomId,setRoomId,firstname,userUid} = useData();
    const handleRoomDelete = async () => {
      try{
        setDeletingSpinner(true);
        const response = await fetch("/api/delete-room",{
          method:'POST',
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({
            roomId:roomId
          }),
        });
        const result = await response.json();
        console.log(result);
        if(result.status === 200){
          setRoomData(null);
          setRoomId(null);
        }
      }catch(error){
        console.log(error);
      }finally{
        setDeletingSpinner(false);
      }
    }
    const handleEnterRoom = async() => {
      try{
        setJoiningSpinner(true);
        const response = await fetch("/api/join-people-list",{
          method:'POST',
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({
            user_id:userUid,
            p_name:firstname,
            in_room_id:roomId,
            has_admin_prev:true,
            role:"admin",
          }),
        })
        const result = await response.json()
        console.log(result);
        setJoiningSpinner(false);
        router.push(`/rooms/${roomId}`);
      }catch(e){
        console.log(e);
      }finally{
        setJoiningSpinner(false);
      }
    }
  return (
    <div className='flex border border-white rounded-xl p-4 min-w-[500px]'>
      <div className='flex flex-col items-start justify-center gap-4 w-full'>
        {/* <span>{RoomData?.user_id}</span> */}
        <span className='text-sm py-2 px-4 rounded-full border border-gray-500 text-gray-300 self-center'>{roomId}</span>
        <span className='text-3xl font-bold flex items-center gap-2'><GoDotFill className="animate-pulse text-red-500"/>{RoomData?.room_name} </span>
        <span className='text-xl font-normal'>{RoomData?.room_desc}</span>
        <div className='flex items-center justify-between gap-4 w-full'>
            <span className="flex items-center gap-2"><MdOutlinePersonOutline className="text-2xl"/>{RoomData?.room_limit}</span>
            <div className="flex items-center gap-3">
              {
                !joiningSpinner?
                <button className='px-4 py-2 text-lg bg-white text-black rounded-xl' onClick={handleEnterRoom}>Enter Room</button>:
                <span><FaSpinner className="animate-spin"/></span>
              }
              {
                !deletingSpinner?
                <button className='px-4 py-2 text-lg' onClick={handleRoomDelete}>Delete Room</button>:
                <span><FaSpinner className="animate-spin"/></span>
              }
            </div>
        </div>
      </div>
    </div>
  )
}

export default PartyRooms
