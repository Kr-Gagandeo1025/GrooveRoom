import { BiUpvote } from "react-icons/bi";
import { IoMdRemoveCircle } from "react-icons/io";
const MusicQueueCard = ({data}) => {
  return (
    <div className="flex w-full p-3 border-b border-gray-500 justify-between items-center">
      <div className="flex gap-3 text-2xl items-center">
      <img
        src={data.song_thumbnail}
        alt={data.song_title}
        className='h-[70px] w-[70px]'
        />
        <span>{data.song_title.slice(0,20)}...</span>
      </div>
      <div className="flex gap-3 items-center">
        <button className="flex gap-1 items-center text-xl">
            {data.upvotes}
            <BiUpvote className="text-green-600 text-3xl "/>
        </button>
        <button>
            <IoMdRemoveCircle className="text-red-600 text-3xl "/>
        </button>
      </div>
    </div>
  )
}

export default MusicQueueCard
