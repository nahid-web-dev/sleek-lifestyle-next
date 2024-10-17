import Card from "@/components/Card/Card"
import Product from "@/models/Product.model"
import Image from "next/image"
import casualBanner from '@/public/images/casual_banner.jpg'
import { FaArrowTrendDown } from "react-icons/fa6"
import connectToDB from '@/lib/connectdb';

export const dynamic = 'force-dynamic'

async function CasualShirts() {
  await connectToDB()

  const allCasuals = await Product.find({ type: 'casual' }).lean()
  const casuals = JSON.parse(JSON.stringify(allCasuals))

  if (!casuals || casuals.length === 0) {
    return <div>No products available. Please check back later!</div>;
  }
  return (
    <div>
      <div className='my-10'>
        <Image
          src={casualBanner}
          alt='Banner Image'
          className=' w-[90%] sm:w-[40%] mx-auto rounded-xl'
          priority
        />
      </div>
      <div className=' text-2xl font-semibold text-stone-600 text-center my-4 sm:my-6'>
        <span className=' italic font-sans' >Casual </span>
        <span className=' text-4xl font-serif text-rose-600 ml-2'> & </span>
        <span className='italic font-sans'>othe</span>
        <span className='text-blue-400'>rs</span>
        <FaArrowTrendDown className='inline-block mx-2 text-rose-600' />
      </div>
      <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-y-10 lg:mx-6'>
        {
          casuals.slice().reverse().map((product) => {
            return <Card key={product._id} product={product} />
          })
        }
      </div>
    </div>
  )
}

export default CasualShirts