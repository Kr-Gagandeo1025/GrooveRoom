'use client'
import { useUser } from "@clerk/nextjs";
import { createContext, useContext, useState } from "react"


const DataContext = createContext();
export const useData = () => useContext(DataContext);

export const DataProvider = ({children}) => {
    const {user} = useUser();
    const firstname = user?.firstName;
    const emailId = user?.primaryEmailAddress.emailAddress;
    const profileimg = user?.imageUrl;
    const userUid = user?.id;

    const [RoomData,setRoomData] = useState(null);

    return (
        <DataContext.Provider value={{firstname,emailId,profileimg,userUid,RoomData,setRoomData}}>
            {children}
        </DataContext.Provider>
    )
}