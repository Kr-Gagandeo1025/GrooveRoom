import { MdPerson } from "react-icons/md"

const PartyHoppersHolder = ({data}) => {
  return (
    <div className="text-white w-[90%] p-2 border-b border-gray-400 flex text-xl items-baseline justify-start gap-3">
        <MdPerson/>
        <span>
            {data?.p_name}
        </span>
        <span className="text-xl text-gray-500">
            {data?.role}
        </span>
    </div>
  )
}

export default PartyHoppersHolder
