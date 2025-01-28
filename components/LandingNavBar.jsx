import Link from "next/link"
import { FaArrowRightLong, FaRegCompass } from "react-icons/fa6";
import { MdCall, MdHomeMax,MdOutlinePersonOutline } from "react-icons/md";

const LandingNavBar = ({isSigned}) => {
  return (
    <div className='flex w-screen items-center justify-between px-6 py-2 backdrop-filter backdrop-blur-xl bg-white bg-opacity-5'>
      <div className='flex'>
        <span className='text-2xl font-bold text-white'>GrooveRoom.</span>
      </div>
      <div className="px-4 py-3 flex text-white bg-white bg-opacity-5 backdrop-blur-xl items-center justify-center gap-10 rounded-2xl text-sm">
        <Link className="group flex items-center justify-center flex-col gap-[1px]" href="#home">
          <span className="flex items-center gap-3 group-hover:text-gray-300">
            <MdHomeMax className="text-lg"/>
            Home
          </span>
          <span className="w-0 bg-gray-300 h-[1px] rounded-xl group-hover:w-full transition-all ease-in-out duration-500"></span>
        </Link>
        <Link className="group flex items-center justify-center flex-col gap-[1px]" href="#explore">
          <span className="flex items-center gap-3 group-hover:text-gray-300">
            <FaRegCompass className="text-lg"/>
            Explore
          </span>
          <span className="w-0 bg-gray-300 h-[1px] rounded-xl group-hover:w-full transition-all ease-in-out duration-500"></span>
        </Link>
        <Link className="group flex items-center justify-center flex-col gap-[1px]" href="#contact">
          <span className="flex items-center gap-3 group-hover:text-gray-300">
            <MdCall className="text-lg"/>
            Contact
          </span>
          <span className="w-0 bg-gray-300 h-[1px] rounded-xl group-hover:w-full transition-all ease-in-out duration-500"></span>
        </Link>
      </div>
      <div className='flex items-center justify-center gap-4'>
        {!isSigned && <><Link href="/sign-in">
          <button className='px-3 py-2 text-sm bg-transparent text-white'>Login</button>
        </Link>
        <Link href="/sign-up">
          <button className='px-3 py-2 text-sm border border-black bg-white text-black rounded-full'>Sign Up</button>
        </Link></>}
        {isSigned && <Link href="/home">
          <button className='px-3 py-2 text-sm border border-black bg-white text-black rounded-full flex items-center gap-3'>Home <FaArrowRightLong/></button>
        </Link>}
      </div>
    </div>
  )
}

export default LandingNavBar
