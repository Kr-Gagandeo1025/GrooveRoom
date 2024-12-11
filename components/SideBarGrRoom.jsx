'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaCircleCheck, FaPeoplePulling, FaPerson, FaRegCopy, FaSpinner } from "react-icons/fa6";
import { MdBlock } from 'react-icons/md';
import PartyHoppersHolder from './PartyHoppersHolder';
import { supabase } from '@/utils/supabase/supabaseClient';
import { useRouter } from "next/navigation";
const SideBarGrRoom = ({data}) => {
    const router = useRouter();
    const [copyStatus,setCopyStatus] = useState(false);
    const [partyHoppers,setPartyHoppers] = useState([]);
    const [exitLoader,setExitLoader] = useState(false);
    const handleCopyRoomId = () => {
        navigator.clipboard.writeText(data.joinedRoomId);
        setCopyStatus(true);
        setTimeout(() => {
            setCopyStatus(false);
        }, 3000);
    }
    const GetListOfPeople = async () =>{
        try{
            const response = await fetch("/api/get-joined-people",{
                method:'POST',
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    room_id:data.joinedRoomId,
                }),
            })
            const result = await response.json();
            console.log(result);
            setPartyHoppers(result.message);
        }catch(error){
            console.log(error);
        }
    }
    const HandleRoomExit = async () => {
        setExitLoader(true);
        const response = await fetch("/api/leave-room",{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                roomId:data.joinedRoomId,
            }),
        })
        const result = await response.json();
        console.log(result);
        if(result.status === 200){
            setExitLoader(false)
            router.push(`/home`);
        }
    }
    useEffect(()=>{
        GetListOfPeople();
        const subscription = supabase.channel('persondata_changes').on('postgres_changes',
            {event:'ALL',schema:'public',table:'persondata',filter:`in_room_id=eq.${data.joinedRoomId}`},
            (payload)=>{
                console.log('Person added:',payload.new);
                setPartyHoppers((prevHoppers)=>[...prevHoppers,payload.new]);
            }
        ).subscribe();

        // return () => {
        //     supabase.removeChannel(subscription);
        // };
    },[]);
  return (
    <div className="w-fit min-w-[450px] flex flex-col h-full px-4 py-6 border-r border-white justify-between">
        <div className="flex flex-col ">
            <span className="text-4xl bold">GrooveRoom.</span>
            <div className='flex flex-col mt-4'>
                <div className='flex gap-4 items-center'>
                    <Image src={data.profileimg} height={50} width={50} alt="user-profile-pic" className='rounded-full'/>
                    <div className='flex flex-col justify-start text-xl'>
                        <span>{data.firstname} {data.lastname} </span>
                        {/* <span className='flex items-center gap-3 text-gray-500 '><FaPerson/> Admin </span> */}
                    </div>
                </div>
            </div>
            <div className='flex mt-10 self-center border border-gray-400 p-2 rounded-2xl'>
                <span className='flex text-xs items-center gap-4'> {copyStatus?<FaCircleCheck/>:<FaRegCopy className='cursor-pointer' onClick={handleCopyRoomId}/>} {data.joinedRoomId} </span>
            </div>
        </div>
        <div className='flex flex-col items-start text-xl h-full mt-10'>
            <span className='flex items-center gap-2 border-b border-white w-full pb-2'>Party Hoppers <FaPeoplePulling/> {partyHoppers.length}/{data.roomDetails.room_limit}</span>
            <div className='w-full flex items-center justify-start flex-col'>
                {partyHoppers.length!==0&&partyHoppers?.map((ph,key)=>(
                    <PartyHoppersHolder data={ph} key={key}/>
                ))}
            </div>
        </div>
        <div className='flex items-baseline self-center'>
            {
                exitLoader?
                <span  className='text-xl p-3 bg-white text-black rounded-full flex items-center gap-2 font-bold'><FaSpinner/></span>
                :
                <button className='text-xl p-3 bg-white text-black rounded-full flex items-center gap-2 font-bold' onClick={HandleRoomExit}>LEAVE PARTY <MdBlock className='text-red-700'/> </button>
            }
        </div>
    </div>
  )
}

export default SideBarGrRoom;
