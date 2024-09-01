'use client'
import { useData } from "@/providers/DataContext";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { MdOutlinePersonOutline } from "react-icons/md";

const PartyRooms = ({RoomData}) => {
    const {setRoomData} = useData();
    const handleRoomDelete = () => {
        setRoomData(null);
    }
  return (
    <div className='flex border border-white rounded-xl p-4 min-w-[500px]'>
      <div className='flex flex-col items-start justify-center gap-4 w-full'>
        {/* <span>{RoomData?.room_id}</span> */}
        <span className='text-sm py-2 px-4 rounded-full border border-gray-500 text-gray-300 self-center'>✨created @ 12:00 hrs </span>
        <span className='text-3xl font-bold flex items-center gap-2'><GoDotFill className="animate-pulse text-red-500"/>{RoomData?.room_name} </span>
        <span className='text-xl font-normal'>{RoomData?.room_desc}</span>
        <div className='flex items-center justify-between gap-4 w-full'>
            <span className="flex items-center gap-2"><MdOutlinePersonOutline className="text-2xl"/>0/{RoomData?.room_limit}</span>
            <div className="flex">
              <Link href={`/rooms/${RoomData?.room_id}`}>
                <button className='px-4 py-2 text-lg bg-white text-black rounded-xl'>Enter Room</button>
              </Link>
                <button className='px-4 py-2 text-lg' onClick={handleRoomDelete}>Delete Room</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default PartyRooms
