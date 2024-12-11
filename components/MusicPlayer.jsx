'use client'

import { FaPlayCircle, FaVolumeMute } from "react-icons/fa"
import { FaInfo, FaVolumeHigh } from "react-icons/fa6"

const MusicPlayer = () => {
  return (
      <div className="flex w-full items-start justify-center gap-10 px-5 bg-white bg-opacity-15 backdrop-filter backdrop-blur-xl py-2 mt-5 mr-4 rounded-xl">
        <img src="/dummy-thmbnail.jpeg" className="w-[200px] h-[200px] rounded-lg"/>
        <div className="flex flex-col h-full justify-start items-start">
          <span className="text-xl font-bold">O re Piya - Flute version</span>
          <span className=" flex mt-10 w-full items-center justify-between">
            <FaPlayCircle className="text-6xl"/>
            <span className="text-xs w-[50%]">*if player is paused then next song wont load !</span>
          </span>
          <span className="flex gap-3 mt-10 text-2xl">
            <FaVolumeMute/>
            <FaVolumeHigh/>
            <FaInfo/>
          </span>
        </div>
      </div>
  )
}

export default MusicPlayer
