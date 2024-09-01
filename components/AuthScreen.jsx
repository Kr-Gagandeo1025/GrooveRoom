import { ArrowBigLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const AuthScreen = () => {
  return (
    <div className='w-2/3 bg-black text-white h-full flex flex-col justify-start pt-20 pl-20'>
      <div className='flex'>
        <Link href="/">
            <span className='flex items-center gap-2 border-b px-5'><ArrowBigLeft/>Back</span>
        </Link>
      </div>
      <div className='mt-20 flex'>
        <span className='text-9xl font-bold'>GrooveRoom.</span>
      </div>
      <div className='flex flex-col mt-20 w-fit'>
        <span className='text-8xl font-bold'>Tune In.</span>
        <span className='text-8xl font-bold'>Turn Up.</span>
        <span className='text-xl font-thin text-center mt-4'>Take Over The Playlist! 🎉</span>
      </div>
    </div>
  )
}

export default AuthScreen
