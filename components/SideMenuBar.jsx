'use client'
import { useData } from '@/providers/DataContext'
import Image from 'next/image';
import Link from 'next/link';
import { MdEmail, MdHomeMax, MdLogout } from 'react-icons/md';
import { FaArrowTrendUp } from "react-icons/fa6";
import { useClerk } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
const SideMenuBar = () => {
    const pathname = usePathname();
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
            <Link href="/home" className={`flex items-center gap-3 ${pathname === '/home'?'':'text-gray-400'} transition-all ease-in-out duration-300`}>
                <MdHomeMax className='text-3xl'/> Home
            </Link>
            <Link href="/rooms" className={`flex items-center gap-3 ${pathname === '/rooms'?'':'text-gray-400'} transition-all ease-in-out duration-300`}>
                <FaArrowTrendUp className='text-3xl'/> Public Rooms
            </Link>
            <span className='flex items-center gap-3 cursor-pointer' onClick={() => signOut({ redirectUrl: '/' })}>
                <MdLogout className='text-3xl'/> LogOut
            </span>
        </div>
        <div className='flex self-baseline justify-baseline flex-col text-sm'>
            <span>welcome to grooveroom 🎉</span>
            <span>v1.0.1 beta</span>
        </div>
    </div>
  )
}

export default SideMenuBar
