"use client"

import ClientOrderCard from "../ClientOrderCard/ClientOrderCard"

function ClientOrders({ orders }) {
  return (
    <div>
      <h2 className='text-center my-6 sm:my-10 text-3xl text-stone-500'>Your Orders</h2>
      <div className='flex flex-wrap justify-evenly gap-5'>
        {orders.slice().reverse().map((order) => {
          return <ClientOrderCard key={order._id} order={order} />
        })}
      </div>
    </div>
  )
}

export default ClientOrders