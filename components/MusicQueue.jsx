import React from 'react'
import { FaMusic } from 'react-icons/fa6'
import MusicQueueCard from './MusicQueueCard'

const MusicQueue = () => {

  return (
    <div className="h-full flex p-2 items-start justify-start flex-col bg-gray-800 w-full rounded-xl">
      <span className='text-2xl flex w-full items-center gap-3'>Music Queue <FaMusic/></span>
      <div className='flex w-full flex-col justify-start items-center'>
      <MusicQueueCard/>
      <MusicQueueCard/>
      <MusicQueueCard/>
      <MusicQueueCard/>
      </div>
    </div>
  )
}

export default MusicQueue
