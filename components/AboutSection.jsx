import { PiWaveformBold } from "react-icons/pi";
import { SiSlideshare } from "react-icons/si";
import { BsGraphUpArrow } from "react-icons/bs";

const AboutSection = () => {
  return (
    <div className='text-white px-10 py-4 mt-20 pb-20 flex w-full items-center justify-center'>
      <div className="flex items-center flex-col justify-center w-full border-r-[1px] border-white gap-3">
        <PiWaveformBold className="text-9xl"/>
        <p className="w-[50%] flex items-center justify-center text-2xl text-center">
            Enjoy your favourite Music
        </p>
      </div>
      <div className="flex items-center flex-col justify-center w-full border-r-[1px] border-white gap-3">
        <SiSlideshare className="text-9xl"/>
        <p className="w-[50%] flex items-center justify-center text-2xl text-center">
            Share Music Live with Friends
        </p>
      </div>
      <div className="flex items-center flex-col justify-center w-full gap-3">
        <BsGraphUpArrow className="text-9xl"/>
        <p className="w-[50%] flex items-center justify-center text-2xl text-center">
            Vote and Control what plays Next
        </p>
      </div>
    </div>
  )
}

export default AboutSection
