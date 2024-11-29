import { BiUpvote } from "react-icons/bi";
import { IoMdRemoveCircle } from "react-icons/io";
const MusicQueueCard = () => {
  return (
    <div className="flex w-full p-3 border-b border-gray-500 justify-between items-center">
      <div className="flex gap-3 text-2xl items-center">
      <img
        src="#"
        alt="#"
        className='h-[70px] w-[70px]'
        />
        <span>This is a music title...</span>
      </div>
      <div className="flex gap-3 text-3xl items-center">
        <button>
            <BiUpvote className="text-green-600"/>
        </button>
        <button>
            <IoMdRemoveCircle className="text-red-600"/>
        </button>
      </div>
    </div>
  )
}

export default MusicQueueCard
