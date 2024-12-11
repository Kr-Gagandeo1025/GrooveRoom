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
import { FaSpinner } from "react-icons/fa6";


export function CreateRoomDialog() {
    const {setRoomData,userUid,setRoomId,setJoinedRoomId} = useData();
    const [roomName,setRoomName] = useState("");
    const [roomDesc,setRoomDesc] = useState("");
    const [roomLimit,setRoomLimit] = useState("");
    const [loader,setLoader] = useState(false);
    const { toast } = useToast()
    const handleRoomSave = async () => {
      // console.log(roomLimit);
      if(roomName !== "" && roomDesc !== "" && roomLimit !== ""){
            setLoader(true);
            const response = await fetch("/api/create-room",{
              method:'POST',
              headers:{
                "Content-Type":"application/json",
              },
              body:JSON.stringify({
                room_name:roomName,
                room_desc:roomDesc,
                room_limit:roomLimit,
                user_id:userUid,
              }),
            })
            const result = await response.json();
            if(result.status===200){
              try{
                const roomResponse = await fetch("/api/get-room",{
                  method:'GET',
                  headers:{
                    "Content-Type":"application/json",
                  }
                })
                const roomResult = await roomResponse.json();
                const roomResultData = roomResult.message;
                // console.log(roomResultData);
                setRoomData({
                  room_name:roomResultData[0].room_name,
                  room_desc:roomResultData[0].room_desc,
                  room_limit:roomResultData[0].room_limit,
                  user_id:roomResultData[0].creator_id,
                  people_count:roomResultData[0].people_count,
                });
                setRoomId(roomResultData[0].id);
                setJoinedRoomId(roomResultData[0].id);
                toast({
                  title: "Room Created !",
                  description: "click on enter room and start your playlist party.",
                })
              }catch(error){
                console.log(error);
                toast({
                  title: "Room Not Created !",
                  description: "we are sorry your room cannot be created at the moment.",
                })
              }
            }else{
              // console.log(result)
              toast({
                title: "Room Not Created !",
                description: "we are sorry your room cannot be created at the moment.",
              })
            }
            setLoader(false);
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
        <button className="w-1/2 bg-white rounded-xl py-5 text-black text-xl flex items-center gap-4 justify-center"><FiPlusSquare className="text-xl"/>Create GrooveRoom</button>
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
          {!loader?
            <button className="p-2 border bg-black text-white rounded-xl outline-none flex items-center gap-2" onClick={handleRoomSave}><CiCircleCheck className="text-2xl"/>Save Room</button>
          :<span className="text-2xl flex animate-spin"><FaSpinner/></span>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
