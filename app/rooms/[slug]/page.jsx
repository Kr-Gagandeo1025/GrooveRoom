'use client'
import PartyRoomsMain from '@/components/MainScreens/PartyRoomsMain'
import SideBarGrRoom from '@/components/SideBarGrRoom'
import { useData } from '@/providers/DataContext'
import { useEffect, useState } from 'react'

const Room = () => {
  const {profileimg,firstname,lastname,joinedRoomId} = useData();
  const [roomDetails, setRoomDetails] = useState({});
  const getRoomData = async() => {
    try{
      const roomResponse = await fetch("/api/get-room-details",{
          method:'POST',
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({
            roomId:joinedRoomId
          })
        })
        const roomResult = await roomResponse.json();
        const roomResultData = roomResult.message;
        console.log(roomResultData);
        if(roomResultData.lenght !== 0){
            setRoomDetails({
              room_name:roomResultData[0].room_name,
              room_limit:roomResultData[0].room_limit,
              people_count:roomResultData[0].people_count,
            });
        }
    }catch(e){
      console.log(e);
    }
  }
  useEffect(()=>{
    getRoomData();
  },[])
  return (
    <div className='w-screen h-screen flex bg-black text-white'>
      <SideBarGrRoom data={{profileimg,firstname,lastname,joinedRoomId,roomDetails}}/>
      <PartyRoomsMain roomdata={roomDetails}/>
  </div>
  )
}

export default Room
