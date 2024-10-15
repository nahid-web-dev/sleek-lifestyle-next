'use client'

import Spinner from "@/components/Spinner/Spinner"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useRef, useState, useEffect } from "react"
import '@/app/auth/user-info/user-info.css'

function page() {

  const { data: session, status } = useSession()

  const router = useRouter()

  const name = useRef()
  const phone = useRef()
  const villageName = useRef()
  const upazila = useRef()

  const [address, setAddress] = useState()

  const receiveData = async () => {
    try {
      const response = await fetch('/api/address/find', {
        method: "POST",
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify(session?.user?.email)
      })
      const data = await response.json()
      if (data.success) {
        setAddress(data?.address)
      }
    } catch (error) {
      console.log(error?.message)
    }
  }

  useEffect(
    () => {
      receiveData()
    }, [status]
  )

  const addInfo = async (e) => {
    e.preventDefault()
    const address = {
      name: name.current.value,
      email: session?.user?.email,
      phone: phone.current.value,
      villageName: villageName.current.value,
      upazila: upazila.current.value,
    }
    const response = await fetch('/api/address/add', {
      method: "POST",
      headers: {
        "Content-Type": 'Application/json'
      },
      body: JSON.stringify(address)
    })
    const data = await response.json()
    if (data.success) {
      toast.success('Information updated successfully')
      setAddress(address)
      router.back()
    }
  }

  if (status === 'authenticated') {
    return (
      <div className=' min-h-[60vh] flex flex-col gap-10 my-10'>
        <ToastContainer />
        {
          session.user &&
          <div className=' flex flex-col justify-center items-center text-gray-500 gap-5'>
            <h2 className=' sm:text-2xl text-slate-500'>Email : {session.user.email}</h2>
            <button onClick={signOut} className=' px-2 py-1 border-2 border-rose-400 rounded-lg sm:text-lg font-medium text-stone-600 hover:px-4 transition-all'>Logout</button>
          </div>
        }
        {
          address && address.name && address.phone &&
          < div className=' text-stone-700 flex items-center flex-col gap-5 sm:gap-10'>
            <div>
              <h2 className=' text-center my-4 text-xl sm:text-2xl'>Delivery Address</h2>
              <div className=' sm:text-2xl text-lg px-5 sm:px-10 flex flex-col gap-4 border-2 border-blue-400 sm:p-10 p-3 rounded-xl'>
                <div className=' sm:flex gap-10'>
                  <h2>Name : {address.name}</h2>
                  <h2>Phone: {address.phone}</h2>
                </div>
                <div >
                  <h2>Village: {address.villageName}</h2>
                  <h2>Upazila: {address.upazila}</h2>
                </div>
              </div>
            </div>
            <div
              className='px-2 h-10 text-xl border-2 border-blue-400 hover:px-4 transition-all rounded-md text-gray-600'>Change Address
            </div>
          </div>
        }
        {
          session.user &&
          <div className=' flex justify-center'>
            <form onSubmit={addInfo} className='bg-slate-200 border border-blue-400 py-4 sm:px-10 px-3 rounded-xl add-form w-[90vw] sm:w-[450px] flex flex-col gap-4'>
              <div>
                <input ref={name} type="text" id='name' placeholder='Reciever name' required />
                <label htmlFor="name">Name</label>
              </div>
              <div>
                <input ref={phone} type="number" id='number' placeholder='Phone number' required />
                <label htmlFor="number">Number</label>
              </div>
              <div>
                <input ref={villageName} type="text" id='village' placeholder='Village name' required />
                <label htmlFor="village">Village</label>
              </div>
              <div>
                <input ref={upazila} type="text" id='upazila' placeholder='Upazila name' required />
                <label htmlFor="upazila">Upazila</label>
              </div>
              <button type='submit'>{address ? 'Change' : 'Submit'}</button>
            </form>
          </div>
        }
      </div>
    )
  }


}

export default page