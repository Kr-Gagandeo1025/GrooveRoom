import AuthScreen from '@/components/AuthScreen'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return(
    <div className='bg-black w-screen h-screen flex items-center justify-center'>
      <AuthScreen/>
      <div className='w-1/3'>
        <SignIn />
      </div>
    </div>
  ) 
}