import Link from "next/link"
import { FaArrowRightLong, FaRegCompass } from "react-icons/fa6";
import { MdCall, MdHomeMax,MdOutlinePersonOutline } from "react-icons/md";

const LandingNavBar = ({isSigned}) => {
  return (
    <div className='flex w-screen items-center justify-between px-10 py-5 backdrop-filter backdrop-blur-xl bg-white bg-opacity-5'>
      <div className='flex'>
        <span className='text-4xl font-bold text-white'>GrooveRoom.</span>
      </div>
      <div className="px-6 py-4 flex text-white bg-white bg-opacity-5 backdrop-blur-xl items-center justify-center gap-10 rounded-2xl text-lg">
        <Link className="flex items-center gap-2" href="#"><MdHomeMax className="text-2xl"/>Home</Link>
        <Link className="flex items-center gap-2" href="#"><MdOutlinePersonOutline className="text-2xl"/>About</Link>
        <Link className="flex items-center gap-2" href="#"><FaRegCompass className="text-2xl"/>Explore</Link>
        <Link className="flex items-center gap-2" href="#"><MdCall className="text-2xl"/>Contact</Link>
      </div>
      <div className='flex items-center justify-center gap-4'>
        {!isSigned && <><Link href="/sign-in">
          <button className='px-5 py-3 text-xl bg-transparent text-white'>Login</button>
        </Link>
        <Link href="/sign-up">
          <button className='px-5 py-3 text-xl border border-black bg-white text-black rounded-full'>Sign Up</button>
        </Link></>}
        {isSigned && <Link href="/home">
          <button className='px-5 py-3 text-xl border border-black bg-white text-black rounded-full flex items-center gap-3'>Home <FaArrowRightLong/></button>
        </Link>}
      </div>
    </div>
  )
}

export default LandingNavBar
