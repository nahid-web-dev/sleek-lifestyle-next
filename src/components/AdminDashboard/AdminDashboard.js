"use client"

import { DateTime } from "luxon";


function AdminDashboard({ users, orders, products, traffics }) {

  const nowInDhaka = DateTime.now().setZone('Asia/Dhaka');
  const dhakaDate = nowInDhaka.toFormat('dd-MM-yyyy HH:mm:ss');

  const thisMonth = dhakaDate.slice().split('-')[1]

  const thisMonthOrders = orders.filter((order) => {
    const orderMonth = order.createdAt.slice().split('-')[1]
    return orderMonth == thisMonth
  })


  const thisMonthUsers = users.filter((user) => {
    const userMonth = user.createdAt.slice().split('-')[1]
    return userMonth == thisMonth
  })

  const thisMonthProducts = products.filter((product) => {
    const productMonth = product.createdAt.slice().split('-')[1]
    return productMonth == thisMonth
  })

  const thisMonthTraffics = traffics.filter((traffic) => {
    const trafficMonth = traffic.createdAt.slice().split('-')[1]
    return trafficMonth == thisMonth
  })


  /////

  const lastMonthOrders = orders.filter((order) => {
    const orderMonth = order.createdAt.slice().split('-')[1]
    return orderMonth == thisMonth - 1
  })


  const lastMonthUsers = users.filter((user) => {
    const userMonth = user.createdAt.slice().split('-')[1]
    return userMonth == thisMonth - 1
  })

  const lastMonthProducts = products.filter((product) => {
    const productMonth = product.createdAt.slice().split('-')[1]
    return productMonth == thisMonth - 1
  })

  const lastMonthTraffics = traffics.filter((traffic) => {
    const trafficMonth = traffic.createdAt.slice().split('-')[1]
    return trafficMonth == thisMonth - 1
  })



  return (

    <div className=" flex flex-col items-center gap-8 px-6 sm:px-8 md:px-4 xl:px-10 py-5">

      <h2 className=" text-stone-800 text-3xl text-center">Analytics</h2>

      <div className=" grid gap-8 sm:gap-10 md:gap-3 lg:gap-10  md:grid-cols-2 xl:grid-cols-3 w-full text-center">

        <div className="flex lg:text-xl text-lg items-center justify-center gap-4 border-2 border-blue-400 lg:p-4 p-2 rounded-xl ">
          <h2 className=" lg:text-2xl text-xl text-blue-600">Orders</h2>
          <span className=" h-full border border-blue-400"></span>
          <div className='flex flex-col gap-2'>
            <h2 className="text-stone-700 font-semibold">Total <br /> {orders?.length} </h2>
            <h2 className="text-rose-700">This Month <br /> {thisMonthOrders?.length}</h2>
            <h2 className=" text-slate-700">Last Month <br /> {lastMonthOrders?.length}</h2>
          </div>
        </div>


        <div className="flex lg:text-xl text-lg items-center justify-center gap-4 border-2 border-green-500 lg:p-4 p-2 rounded-xl ">
          <h2 className=" lg:text-2xl text-xl text-green-600">Users</h2>
          <span className=" h-full border border-green-500"></span>
          <div className='flex flex-col gap-2' >
            <h2 className="text-stone-700 font-semibold">Total <br /> {users?.length} </h2>
            <h2 className="text-rose-700">This Month <br /> {thisMonthUsers?.length}</h2>
            <h2 className="text-slate-700">Last Month <br /> {lastMonthUsers?.length}</h2>
          </div>
        </div>

        <div className="flex lg:text-xl text-lg items-center justify-center gap-4 border-2 border-indigo-500 lg:p-4 p-2 rounded-xl ">
          <h2 className=" lg:text-2xl text-xl text-indigo-600">Traffics</h2>
          <span className=" h-full border border-indigo-500"></span>
          <div className='flex flex-col gap-2' >
            <h2 className="text-stone-700 font-semibold">Total <br /> {traffics?.length} </h2>
            <h2 className="text-rose-700">This Month <br /> {thisMonthTraffics?.length}</h2>
            <h2 className="text-slate-700">Last Month <br /> {lastMonthTraffics?.length}</h2>
          </div>
        </div>

        <div className="flex lg:text-xl text-lg items-center justify-center gap-4 border-2 border-gray-500 lg:p-4 p-2 rounded-xl ">
          <h2 className=" lg:text-2xl text-xl text-gray-600">Products</h2>
          <span className=" h-full border border-gray-500"></span>
          <div className='flex flex-col gap-2'>
            <h2 className="text-stone-700 font-semibold">Total <br /> {products?.length} </h2>
            <h2 className="text-rose-700">This Month <br /> {thisMonthProducts?.length}</h2>
            <h2 className="text-slate-700">Last Month <br /> {lastMonthProducts?.length}</h2>
          </div>
        </div>


      </div>

      <div>

      </div>


    </div>
  )
}

export default AdminDashboard