'use client'
import { useData } from '@/providers/DataContext'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaCircleCheck, FaPeoplePulling, FaPerson, FaRegCopy } from "react-icons/fa6";
import { MdBlock } from 'react-icons/md';
const SideBarGrRoom = () => {
    const {profileimg,firstname,lastname,joinedRoomId} = useData();
    const [copyStatus,setCopyStatus] = useState(false);
    const handleCopyRoomId = () => {
        navigator.clipboard.writeText(joinedRoomId);
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
                    room_id:joinedRoomId,
                }),
            })
            const result = await response.json();
            console.log(result);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        GetListOfPeople();
    },[])
  return (
    <div className="w-fit min-w-[450px] flex flex-col h-full px-4 py-6 border-r border-white justify-between">
        <div className="flex flex-col">
            <span className="text-4xl bold">GrooveRoom.</span>
            <div className='flex flex-col mt-10'>
                <div className='flex gap-4 items-center'>
                    <Image src={profileimg} height={50} width={50} alt="user-profile-pic" className='rounded-full'/>
                    <div className='flex flex-col justify-start text-xl'>
                        <span>{firstname} {lastname} </span>
                        <span className='flex items-center gap-3 text-gray-500 '><FaPerson/> Admin </span>
                    </div>
                </div>
            </div>
            <div className='flex mt-10 self-center border border-gray-400 p-2 rounded-2xl'>
                <span className='flex text-xl items-center gap-4'> {copyStatus?<FaCircleCheck/>:<FaRegCopy className='cursor-pointer' onClick={handleCopyRoomId}/>} {joinedRoomId} </span>
            </div>
        </div>
        <div className='flex flex-col items-start text-2xl h-full mt-10'>
            <span className='flex items-center gap-2 border-b border-white w-full pb-2'>Party Hoppers <FaPeoplePulling/></span>
        </div>
        <div className='flex items-baseline self-center'>
            <button className='text-xl p-3 bg-white text-black rounded-full flex items-center gap-2 font-bold'>END PARTY <MdBlock className='text-red-700'/> </button>
        </div>
    </div>
  )
}

export default SideBarGrRoom;
