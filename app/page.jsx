import HeroSection from "@/components/HeroSection";
import LandingNavBar from "@/components/LandingNavBar";
import {auth} from "@clerk/nextjs/server";


export default function Home() {
  const {userId} = auth();
  return (
    <main className="w-screen h-screen bg-black">
      <div className="fixed">
        <LandingNavBar isSigned={userId}/>
      </div>
      <div className="pt-[150px]">
        <HeroSection/>
      </div>
    </main>
  );
}
