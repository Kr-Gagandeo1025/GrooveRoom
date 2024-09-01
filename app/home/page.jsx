'use client'
import HomeScreen from '@/components/MainScreens/HomeScreen'
import SideMenuBar from '@/components/SideMenuBar'
import React from 'react'

const HomePage = () => {
  return (
    <div className='w-screen h-screen flex bg-black text-white'>
      <SideMenuBar/>
      <HomeScreen/>
    </div>
  )
}

export default HomePage
