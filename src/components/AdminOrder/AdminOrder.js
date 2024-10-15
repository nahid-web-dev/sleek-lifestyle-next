'use client'

import { useState, useRef } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import OrderCard from "../OrderCard/OrderCard"
import { IoSearch } from "react-icons/io5"

function AdminOrder({ orders }) {

  const [selectedOrders, setSelectedOrders] = useState(orders)
  const [orderStatus, setOrderStatus] = useState('all')
  const [inputValue, setInputValue] = useState('')
  const [ordersString, setOrdersString] = useState(
    orders?.slice().map((order) => {
      return `${order._id} ${order.createdAt}`
    })
  )
  const inputRef = useRef('')

  const changeStatus = (status) => {
    setOrderStatus(status)
    if (status === 'all') {
      return setSelectedOrders(orders)
    }
    const filteredOrders = orders.filter(order => {
      return order.status === status
    })
    setSelectedOrders(filteredOrders)
  }


  const searchOrder = (e) => {
    e.preventDefault()

    const inputString = inputRef.current.value

    const filteredOrdersDetails = ordersString.slice().filter((string) => {
      return string.includes(inputString)
    })
    const filteredOrdersIds = filteredOrdersDetails.map((orderDetails) => {
      const orderIdString = orderDetails.slice().split(' ')[0]
      return orderIdString
    })
    const filteredOrders = orders.filter((order) => {
      return filteredOrdersIds.some((id) => id === order._id || id === order.createdAt)
    })
    setSelectedOrders(filteredOrders)
  }


  return (
    <div className='flex flex-col gap-4 items-center w-full'>
      <div className='flex justify-end w-full'>
        <div className='  sticky top-12 sm:top-14 text-stone-600 font-semibold bg-[rgba(255,255,255,0.7)] z-20 md:mx-14 rounded-lg shadow-[0px_0px_5px_1px_rgba(0,0,0,0.6)] '>
          <Select value={orderStatus} onValueChange={changeStatus} >
            <SelectTrigger className="w-[140px] sm:w-[180px] px-2 sm:px-5 ">
              <SelectValue placeholder="all" />
            </SelectTrigger>
            <SelectContent className='text-stone-500 font-semibold'>
              <SelectGroup>
                <SelectLabel className='text-slate-500'>Status</SelectLabel>
                <SelectItem value='all'>All</SelectItem>
                <SelectItem value='pending'>Pending</SelectItem>
                <SelectItem value='canceled'>Canceled</SelectItem>
                <SelectItem value='placed'>Placed</SelectItem>
                <SelectItem value='completed'>Completed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <form onSubmit={searchOrder} className='flex gap-3 items-center'>
        <input type='text' ref={inputRef} placeholder='Enter Order Id' className=' h-10 w-[80%] max-w-[360px] border outline-1 outline-blue-400 rounded-lg px-4' />
        <button className=' flex items-center justify-center text-lg h-10 sm:hover:w-14 transition-all w-10 rounded-lg border border-blue-400 ' ><IoSearch /></button>
      </form>
      <div>
        <div className='flex flex-wrap justify-evenly sm:gap-10 gap-5'>
          {
            selectedOrders && selectedOrders.slice().reverse().map((singleOrder, idx) => {
              return <OrderCard key={singleOrder._id} singleOrder={singleOrder} idx={idx} />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default AdminOrder