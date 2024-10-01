// import { useState, useEffect } from "react";
// import { supabase } from "@/utils/supabase/supabaseClient";
import HeroSection from "@/components/HeroSection";
import LandingNavBar from "@/components/LandingNavBar";
import {auth} from "@clerk/nextjs/server";



export default async function Home() {
  // const [rooms,setRooms] = useState([]);
  const {userId,getToken} = auth();
  const token = await getToken();
  // console.log(token);
  // useEffect(() => {
  //   // Fetch rooms from Supabase
  //   const fetchRooms = async () => {
  //     const { data, error } = await supabase.from('roomsdata').select();
  //     if (error) {
  //       console.error('Error fetching rooms:', error);
  //     } else {
  //       setRooms(data);
  //     }
  //   };

  //   fetchRooms();
  //   console.log(rooms);
  // }, []);
  return (
    <main className="w-screen h-screen bg-black">
      <div className="fixed">
        <LandingNavBar isSigned={userId}/>
      </div>
      <div className="pt-[150px]">
        <HeroSection/>
      </div>
    </main>
  );
}
