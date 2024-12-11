import Link from 'next/link'
import React from 'react'
import { BiCoffee } from 'react-icons/bi'
import { CiFacebook, CiInstagram, CiYoutube } from 'react-icons/ci'
import { MdEmail } from 'react-icons/md'

const FooterSection = () => {
  return (
    <div className='mt-20 pb-4 text-white w-full flex items-center justify-center border-t-[0.5px] border-white pt-10'>
      <div className='flex flex-col items-start justify-center w-[70%] px-10'>
        <span className='text-4xl'>want to say something ?</span>
        <div className='flex items-center justify-between gap-3'>
            <span className='text-3xl'>reach us out on </span>
            <span className='flex items-center gap-6 text-4xl font-bold'>
                <Link href="#">
                    <CiInstagram className='hover:text-pink-500 transition-all ease-in-out'/>
                </Link>
                <Link href="#">
                    <CiFacebook className='hover:text-blue-500 transition-all ease-in-out'/>
                </Link>
                <Link href="#">
                    <CiYoutube className='hover:text-red-500 transition-all ease-in-out'/>
                </Link>
                <Link href="#">
                    <MdEmail className='hover:text-gray-500 transition-all ease-in-out'/>
                </Link>
            </span>
        </div>
        <span>@kr-gagandeo - 2024</span>
      </div>
      <div className='flex w-[30%] flex-col items-end justify-center px-10'>
        <span className='text-2xl'>coffee please !?</span>
        <button className='flex items-center gap-3 bg-white text-black text-lg px-4 py-2 rounded-full font-bold group'>buy <BiCoffee className='group-hover:text-red-950 transition-all ease-in-out'/></button>
      </div>
    </div>
  )
}

export default FooterSection
