'use client'
import { useUser } from "@clerk/nextjs";
import { createContext, useContext, useState } from "react"


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