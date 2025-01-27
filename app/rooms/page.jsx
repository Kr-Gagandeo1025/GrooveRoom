import SideMenuBar from '@/components/SideMenuBar'
import React from 'react'

const page = () => {
  return (
    <div className='w-screen h-screen flex bg-black text-white items-center justify-between text-3xl'>
        <SideMenuBar/>
        <div className='w-full items-center justify-center flex'>
            Coming Soon...
        </div>
    </div>
  )
}

export default page
