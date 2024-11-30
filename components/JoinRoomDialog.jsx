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
import { useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { FaSpinner } from "react-icons/fa6";
import { GiPadlock } from "react-icons/gi";
import { IoEnterOutline } from "react-icons/io5";
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation";
import { useData } from "@/providers/DataContext";
const JoinRoomDialog = () => {
    const {setJoinedRoomId,setRoomId,firstname,userUid} = useData();
    const { toast } = useToast();
    const router = useRouter();
    const [roomCode,setRoomCode] = useState(null);
    const [loader,setLoader] = useState(false);
    const handleRoomJoin = async () => {
        try{
            console.log("joining room");
            if(roomCode===null){
                toast({
                    title: "Room Not Joined !",
                    description: "Missing Room Code! Enter Room Code to join.",
                })
                // setLoader(false);s
                return;
            }
            // api code for updating joined list here
            try{
              setLoader(true);
              const response = await fetch("/api/join-people-list",{
                method:'POST',
                headers:{
                  "Content-Type":"application/json",
                },
                body:JSON.stringify({
                  user_id:userUid,
                  p_name:firstname,
                  in_room_id:roomCode,
                  has_admin_prev:false,
                  role:"member",
                }),
              })
              const result = await response.json()
              console.log(result);
              setLoader(false);
              if(result.status === 200){
                router.push(`/rooms/${roomCode}`);
              }else{
                toast({
                  title: "Unable to Join Room !",
                  description: "Please try again later.",
                })
              }
            }catch(e){
              console.log(e);
            }finally{
              setRoomId(roomCode);
              setJoinedRoomId(roomCode);
              setLoader(false);
            }
        }catch(error){
            console.log(error);
        }finally{
            setLoader(false);
        }
    }
  return (
      <Dialog>
      <DialogTrigger asChild>
        <button className="w-1/2 border border-white py-5 rounded-xl flex items-center gap-4 justify-center"><IoEnterOutline className="text-3xl"/>Join GrooveRoom</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <span className="text-3xl">Let&apos;s start Grooving.🎉</span>
          </DialogTitle>
          <DialogDescription>
            Enter Room code to join a GrooveRoom.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col w-full text-xl gap-6 mb-4">
          <div className="flex flex-col w-full items-start justify-center">
            <label htmlFor="party_name" className="flex items-center gap-3">Party Code <GiPadlock/></label>
            <input className="w-full border-b border-black outline-none" id="party_name" type="text" value={roomCode} onChange={(e)=>{e.preventDefault();
                setRoomCode(e.target.value);
            }}/>
          </div>
        </div>
        <DialogFooter>
          {!loader?
            <button className="p-2 border bg-black text-white rounded-xl outline-none flex items-center gap-2" onClick={handleRoomJoin}><CiCircleCheck className="text-2xl"/>Join Room</button>
          :<span className="text-2xl flex animate-spin"><FaSpinner/></span>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default JoinRoomDialog
