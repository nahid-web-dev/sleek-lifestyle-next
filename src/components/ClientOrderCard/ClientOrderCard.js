import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"

function ClientOrderCard({ order }) {
  return (
    <div className=' relative flex flex-col gap-4 border-2 border-blue-400 p-4 rounded-xl min-w-[300px] w-[90%] sm:max-w-[340px] '>

      <div className='flex flex-col justify-between h-full gap-8'>

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
              order.products.map((product, idx) => {
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

      {/* <h2 className=' absolute top-2 left-3  w-14 flex justify-center items-center h-14 text-stone-600 border border-stone-700 rounded-full '>{idx + 1}</h2> */}

    </div>

  )
}

export default ClientOrderCard