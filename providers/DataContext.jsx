'use client'
import { useUser } from "@clerk/nextjs";
import { createContext, useContext, useEffect, useState } from "react"


const DataContext = createContext();
export const useData = () => useContext(DataContext);

export const DataProvider = ({children}) => {
    const {user} = useUser();
    const firstname = user?.firstName;
    const lastname = user?.lastName;
    const emailId = user?.primaryEmailAddress.emailAddress;
    const profileimg = user?.imageUrl;
    const userUid = user?.id;

    const [RoomData,setRoomData] = useState(null);
    const [roomId,setRoomId] = useState(null);
    const [joinedRoomId,setJoinedRoomId] = useState(null);

    const getExistingRoomData = async () =>{
        try{
            const roomResponse = await fetch("/api/get-room",{
                method:'GET',
                headers:{
                  "Content-Type":"application/json",
                }
              })
              const roomResult = await roomResponse.json();
              const roomResultData = roomResult.message;
              console.log(roomResultData);
              if(roomResultData.lenght !== 0){
                  setRoomData({
                    room_name:roomResultData[0].room_name,
                    room_desc:roomResultData[0].room_desc,
                    room_limit:roomResultData[0].room_limit,
                    user_id:roomResultData[0].creator_id,
                    people_count:roomResultData[0].people_count,
                  });
                  setRoomId(roomResultData[0].id);
                  setJoinedRoomId(roomResultData[0].id);
              }
        }catch(e){
            setRoomData(null);
            setRoomId(null);
            setJoinedRoomId(null);
        }
    }

    useEffect(()=>{
        getExistingRoomData();
    },[])


    return (
        <DataContext.Provider value={{
            firstname,
            lastname,
            emailId,
            profileimg,
            userUid,
            RoomData,
            setRoomData,
            roomId,
            setRoomId,
            joinedRoomId,
            setJoinedRoomId}}>
            {children}
        </DataContext.Provider>
    )
}