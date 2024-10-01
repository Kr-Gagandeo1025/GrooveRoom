'use client'
import MusicPlayer from '../MusicPlayer'

const PartyRoomsMain = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-start py-10 px-5">
      <div className='flex'>
        <span className='text-3xl font-bold'>Party Room Name</span>
      </div>
      <MusicPlayer/>
    </div>
  )
}

export default PartyRoomsMain
