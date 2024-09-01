'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { FiPlusSquare } from "react-icons/fi";
import { CiCircleCheck } from "react-icons/ci";
import { useData } from "@/providers/DataContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast"


export function CreateRoomDialog() {
    const {setRoomData,userUid} = useData();
    const [roomName,setRoomName] = useState("");
    const [roomDesc,setRoomDesc] = useState("");
    const [roomLimit,setRoomLimit] = useState("");
    const { toast } = useToast()
    const handleRoomSave = () => {
        console.log(roomLimit);
        if(roomName !== "" && roomDesc !== "" && roomLimit !== ""){
            setRoomData({
                room_name:roomName,
                room_desc:roomDesc,
                room_limit:roomLimit,
                room_id:userUid,
            })
            toast({
              title: "Room Created !",
              description: "click on enter room and start your playlist party.",
            })
        }else{
            toast({
                title: "Missing Room Details !",
                description: "please fill all the details for the party to be created",
              })
        }
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-1/2 bg-white rounded-xl py-5 text-black flex items-center gap-4 justify-center"><FiPlusSquare className="text-3xl"/>Create GrooveRoom</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <span className="text-3xl">Let&apos;s start Grooving.🎉</span>
          </DialogTitle>
          <DialogDescription>
            Enter details for your GrooveRoom.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col w-full text-xl gap-6 mb-4">
          <div className="flex flex-col w-full items-start justify-center">
            <label htmlFor="party_name">Party Name</label>
            <input className="w-full border-b border-black outline-none" id="party_name" type="text" value={roomName} onChange={(e)=>{e.preventDefault();
                setRoomName(e.target.value);
            }}/>
          </div>
          <div className="flex flex-col w-full items-start justify-center">
            <label htmlFor="party_desc">Party Description</label>
            <input className="w-full border-b border-black outline-none" id="party_desc" type="text" value={roomDesc} placeholder="a fantastic party 😍" onChange={(e)=>{e.preventDefault();
                setRoomDesc(e.target.value);}}/>
          </div>
          <div>
            <Select onValueChange={(value)=>{setRoomLimit(value)}}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Limit Party Animals" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="15">15</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <button className="p-2 border bg-black text-white rounded-xl outline-none flex items-center gap-2" onClick={handleRoomSave}><CiCircleCheck className="text-2xl"/>Save Room</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
