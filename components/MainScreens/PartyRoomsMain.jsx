'use client'
import MusicPlayer from '../MusicPlayer'
import MusicQueue from '../MusicQueue'
import MusicSearch from '../MusicSearch'

const PartyRoomsMain = ({roomdata}) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-start pt-10 pl-4">
      <div className='flex'>
        <span className='text-3xl font-bold'>{roomdata.room_name}</span>
      </div>
      <div className="flex items-center justify-center h-full w-full pt-4">
        <div className="flex flex-col h-full items-center justify-start w-[60%]">
          <MusicPlayer RoomID={roomdata.id}/>
          <MusicSearch/>
        </div>
        <div className="flex h-full items-center justify-center w-[40%] pr-4 pb-3">
          <MusicQueue/>
        </div>
      </div>
    </div>
  )
}

export default PartyRoomsMain
