import Link from 'next/link'
import React from 'react'
import { FaLockOpen } from "react-icons/fa";

const ExploreSection = () => {
  return (
    <div className='w-full mt-20 flex flex-col items-center justify-center text-white pb-12'>
      <div className='flex flex-col items-center justify-center gap-12'>
        <span className='text-5xl'>don&apos;t have friends ? why not make some !</span>
        <span className="inline-block from-black via-gray-300 to-white bg-[length:_400%_400%] p-0.5 bg-gradient-to-r rounded-full text-sm">
            <span className="block rounded-full bg-gray-900 px-5 py-3 text-white">✨ introducing public rooms.</span>
        </span>
        <Link href="/rooms" className='px-6 py-4 text-2xl bg-white text-black rounded-full cursor-pointer font-bold'>
            <span className='flex items-center gap-2'><FaLockOpen/>Join a Public Room</span>
        </Link>
      </div>
    </div>
  )
}

export default ExploreSection
