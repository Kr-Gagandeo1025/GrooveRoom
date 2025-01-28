import { BiPlay } from "react-icons/bi"

const HeroSection = () => {
  return (
    <div className='text-white w-screen h-screen items-center flex flex-col gap-4 pb-5' id="home">
        <span className="inline-block from-black via-gray-300 to-white bg-[length:_400%_400%] p-0.5 bg-gradient-to-r rounded-full text-sm">
            <span className="block rounded-full bg-gray-900 px-5 py-3 text-white">✨new era of playlist party just arrived.</span>
        </span>
        <span className='text-8xl font-bold'>
            JOIN. LISTEN. VOTE.
        </span>
        <span className='text-xl font-thin'>
            Control the Vibes Together
        </span>
        <div className="bg-white w-[70%] p-0.5 rounded-xl mt-20 h-full from-black via-gray-300 to-black bg-gradient-to-r">
            <div className="bg-black h-full w-full rounded-xl flex items-center justify-center">
                <BiPlay className="text-7xl"/>
            </div>
        </div>
    </div>
  )
}

export default HeroSection
