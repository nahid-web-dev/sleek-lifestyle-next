"use client"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { FaRegCircleCheck, FaRegCircleDot, FaRegCircleDown, FaRegCircleXmark } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";
import { useState, useRef } from "react";


function OrderCard({ singleOrder, idx }) {

  const [order, setOrder] = useState(singleOrder)

  const [orderStatus, setOrderStatus] = useState(singleOrder.status)

  const changeStatus = (newStatus) => {
    setOrderStatus(newStatus)
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const response = await fetch('/api/order/update-status', {
        method: "POST",
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify({
          id: order._id,
          status: orderStatus,
        })
      })
      const data = await response.json()
      if (data.success) {
        setOrder(data.order)
      }
    } catch (error) {
      alert(error?.message)
    }

  }


  return (
    <div className=' relative flex flex-col gap-4 border-2 border-blue-400 p-4 rounded-xl min-w-[300px] w-[90%] sm:w-[340px] '>

      <div className='flex flex-col justify-between h-full gap-8'>

        <form className=' text-stone-600 font-semibold flex flex-col items-center gap-2' onSubmit={handleSubmit}>
          <Select className='rounded-lg ' value={orderStatus} onValueChange={changeStatus} >
            <SelectTrigger className="w-[140px] sm:w-[180px] px-2 sm:px-5">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className='text-stone-500 font-semibold'>
              <SelectGroup>
                <SelectLabel className='text-slate-500'>Status</SelectLabel>
                <SelectItem value='pending'>Pending</SelectItem>
                <SelectItem value='canceled'>Cancel</SelectItem>
                <SelectItem value='placed'>Place</SelectItem>
                <SelectItem value='completed'>Complete</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <button className='text-lg font-normal text-center py-1 px-7 border-2 border-blue-300 rounded-lg focus:px-9 transition-all ' type='submit'>Set</button>
        </form>

        <div>
          <h2 className='text-lg underline text-center mb-2' >Order Details</h2>
          <div className=' flex flex-col'>
            <h2 >Status : {order.status}</h2>
            <h2>Date : {order.createdAt}</h2>
            <div className='flex gap-1 items-center'>
              Order ID :<p className='text-sm text-red-800 font-normal '>{order._id}</p>
            </div>
          </div>
        </div>

        <div className='w-full'>
          <h2 className='text-center text-lg underline'>Products details</h2>
          <div className='flex flex-col items-center'>
            {
              order?.products.map((product, idx) => {
                return <div className='flex items-center gap-4 text-lg' key={idx}>
                  <h2>{idx + 1}.</h2>
                  <h2>Size : {product.size},</h2>
                  <h2>Qn : {product.quantity},</h2>
                  <Link href={`/shop/${product.productId}`} target='_blank' className=' text-blue-600 flex gap-2 items-center'>Image <FiArrowUpRight /></Link>
                </div>
              })
            }
          </div>
        </div>
      </div>

      <div>
        <h2 className=' text-center text-lg underline'>Delivery Address</h2>
        <div className='flex flex-col text-sm sm:text-base'>
          <div>
            <h2>Name : {order.address.name}</h2>
            <h2>Phone: {order.address.phone}</h2>
          </div>
          <div >
            <h2>Village : {order.address.villageName}</h2>
            <h2>Upazila: {order.address.upazila}</h2>
          </div>
        </div>
      </div>

      <div className=' absolute top-2 right-3 text-4xl '>
        {
          order.status === 'pending' ? <FaRegCircleDown className='text-green-600' />
            : order.status === 'completed' ? <FaRegCircleCheck className='text-green-600' />
              : order.status === 'placed' ? <FaRegCircleDot className='text-green-700' />
                : order.status === 'canceled'
                && <FaRegCircleXmark className='text-rose-600' />
        }
      </div>

      <h2 className=' absolute top-2 left-3  w-14 flex justify-center items-center h-14 text-stone-600 border border-stone-700 rounded-full '>{idx + 1}</h2>

    </div>

  )
}

export default OrderCard