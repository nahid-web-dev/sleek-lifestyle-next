"use client"
import Spinner from '@/components/Spinner/Spinner'
import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaFacebook, FaGoogle } from 'react-icons/fa'
import logo from '@/public/images/logo.png'

export default function SignInPage() {
  const { data: session, status } = useSession()

  const router = useRouter()

  if (status === 'authenticated') {
    router.push('/auth/user-info')
    return null
  } else if (status === 'loading') {
    return (
      <Spinner />
    )
  } else {
    return (
      <div className="sm:w-80 bg-white border-2 shadow-[0_0_10px_2px_rgba(0,0,0,0.6)] rounded-lg p-4 sm:p-8 sm:rounded-2xl flex flex-col items-center gap-4">
        <div className="text-3xl font-bold text-stone-600 mb-4 flex items-center h-10 overflow-hidden">
          <h1>Signin into</h1>
          <Image
            src={logo}
            alt='logo'
            className='w-20'
            priority
          />
        </div>
        <button
          className=" w-full border-2 rounded-lg  font-bold p-4 text-slate-700 flex items-center justify-center gap-2 hover:bg-stone-200"
          onClick={() => signIn('google')}
        >
          <FaGoogle className=' text-3xl' />
          Sign in with Google
        </button>
        <button
          className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded-lg flex justify-center items-center gap-2"
          onClick={() => signIn('facebook', { scope: 'email' })}
        >
          <FaFacebook className=' text-3xl ' />
          Sign in with Facebook
        </button>
      </div>
    )
  }

}