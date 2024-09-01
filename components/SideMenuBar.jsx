'use client'
import { useData } from '@/providers/DataContext'
import Image from 'next/image';
import Link from 'next/link';
import { MdEmail, MdHomeMax, MdLogout } from 'react-icons/md';
import { FaArrowTrendUp } from "react-icons/fa6";
import { useClerk } from '@clerk/nextjs';
const SideMenuBar = () => {
    const { signOut } = useClerk()
    const {firstname,emailId,profileimg} = useData();
  return (
    <div className="w-fit min-w-[450px] flex flex-col h-full px-4 py-6 border-r border-white justify-between">
        <div className="flex flex-col">
            <span className="text-4xl bold">GrooveRoom.</span>
            <div className='flex flex-col mt-10'>
                <div className='flex gap-4 items-center'>
                    <Image src={profileimg} height={50} width={50} alt="user-profile-pic" className='rounded-full'/>
                    <div className='flex flex-col justify-start text-xl'>
                        <span>Welcome, {firstname}</span>
                        <span className='flex items-center gap-3'><MdEmail/> {emailId}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex flex-col items-start justify-center gap-10 text-2xl'>
            <Link href="#" className='flex items-center gap-3'>
                <MdHomeMax className='text-3xl'/> Home
            </Link>
            <Link href="#" className='flex items-center gap-3'>
                <FaArrowTrendUp className='text-3xl'/> Public Rooms
            </Link>
            <span className='flex items-center gap-3 cursor-pointer' onClick={() => signOut({ redirectUrl: '/' })}>
                <MdLogout className='text-3xl'/> LogOut
            </span>
        </div>
        <div className='flex self-baseline justify-baseline flex-col'>
            <span>welcome to grooveroom 🎉</span>
            <span>v1.0.1</span>
        </div>
    </div>
  )
}

export default SideMenuBar
