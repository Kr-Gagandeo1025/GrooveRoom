import PartyRoomsMain from '@/components/MainScreens/PartyRoomsMain'
import SideBarGrRoom from '@/components/SideBarGrRoom'
import React from 'react'

const Room = () => {
  return (
    <div className='w-screen h-screen flex bg-black text-white'>
      <SideBarGrRoom/>
      <PartyRoomsMain/>
  </div>
  )
}

export default Room
