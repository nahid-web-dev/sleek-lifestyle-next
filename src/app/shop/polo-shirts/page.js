import Card from "@/components/Card/Card"
import Product from "@/models/Product.model"
import Image from "next/image"
import poloBanner from '@/public/images/polo_banner.jpg'
import { FaArrowTrendDown } from "react-icons/fa6"
import connectToDB from '@/lib/connectdb';

export const dynamic = 'force-dynamic'

async function PoloShirts() {
  await connectToDB()
  const allPoloShirts = await Product.find({ type: 'polo-shirt' }).lean()
  const poloShirts = JSON.parse(JSON.stringify(allPoloShirts))
  if (!poloShirts || poloShirts.length === 0) {
    return (
      <div className=" my-20 text-xl text-rose-600 text-center">
        <h2>No Product Here!</h2>
      </div>
    )
  }
  return (
    <div>
      {/* <div className='my-10'>
        <Image
          src={poloBanner}
          alt='Banner Image'
          className=' w-[90%] sm:w-[40%] mx-auto rounded-xl'
          priority
        />
      </div> */}
      {/* <div className=' text-2xl font-semibold text-stone-600 text-center my-4 sm:my-6'>
        <span className=' italic font-sans' >Latest </span>
        <span className=' text-4xl font-serif text-rose-600 ml-2'> Polo </span>
        <span className='italic font-sans'>shi</span>
        <span className='text-blue-400'>rts</span>
        <FaArrowTrendDown className='inline-block mx-2 text-rose-600' />
      </div> */}
      <div className="my-10"></div>
      <div className=' flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 xl:gap-x-5 2xl:gap-x-8 gap-y-5 md:gap-y-10 lg:mx-6'>
        {
          poloShirts.slice().reverse().map((product) => {
            return <Card key={product._id} product={product} />
          })
        }
      </div>
    </div>
  )
}

export default PoloShirts