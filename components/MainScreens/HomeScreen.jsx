'use client'
import { IoEnterOutline } from "react-icons/io5";
import { GiPartyFlags } from "react-icons/gi";
import { CreateRoomDialog } from "../CreateRoomDialog";
import { useData } from "@/providers/DataContext";
import PartyRooms from "../PartyRooms";
import JoinRoomDialog from "../JoinRoomDialog";
const HomeScreen = () => {
    const {RoomData} = useData(null);
  return (
    <div className="w-full h-full flex flex-col items-center justify-start py-10 px-5">
        <div className="flex flex-col gap-2 items-center">
            <span className="text-5xl font-bold">Bring the Crowd 😍, Rock the Playlist 🕺</span>    
            <span className="text-2xl font-thin">Music That Moves with You! 🎶</span>
        </div>
        <div className="flex gap-6 w-full mt-20 text-2xl">
            {RoomData===null ? <>
                <CreateRoomDialog/>
                <JoinRoomDialog/>
            </>:<div className="flex flex-col items-center justify-center w-full">
                <span className="text-3xl">Woohoo! 😍, You Already have a GrooveRoom Live 🎉</span>
                <span className="text-lg font-thin">delete the live room to get back the options!</span>  
            </div>}
        </div>
        <div className="flex flex-col w-full mt-12">
            <span className="text-2xl border-b border-white pb-5 w-full flex items-center gap-3 "><GiPartyFlags className="text-2xl"/>Your Active Room</span>
            <div className="flex w-full items-center justify-center flex-col py-5 gap-4">
                {RoomData === null? <>
                    <span className="text-lg font-bold">ohh snap! 🥺 you don&apos;t have a party room 🎵</span>
                    <span className="font-thin text-sm">click 👆 on Create GrooveRoom to host a party! 🎉</span>
                </>:<div className="w-full flex items-start justify-start">
                    <PartyRooms RoomData={RoomData}/>
                </div>}
            </div>
        </div>
    </div>
  )
}

export default HomeScreen
