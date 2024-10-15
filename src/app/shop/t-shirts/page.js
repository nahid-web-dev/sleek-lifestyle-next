import Card from "@/components/Card/Card"
import Product from "@/models/Product.model"
import Image from "next/image"
import sleekBanner from '@/public/images/sleek_banner.png'
import { FaArrowTrendDown } from "react-icons/fa6"

export const dynamic = 'force-dynamic'

async function TShirtsPage() {
  const allTShirts = await Product.find({ type: 't-shirt' }).lean()
  const tShirts = JSON.parse(JSON.stringify(allTShirts))
  return (
    <div>
      <div className='my-10'>
        <Image
          src={sleekBanner}
          alt='Banner Image'
          className=' w-[90%] sm:w-[60%] mx-auto rounded-xl'
          priority
        />
      </div>
      <div className=' text-2xl font-semibold text-stone-600 text-center my-4 sm:my-6'>
        <span className=' italic font-sans' >Latest </span>
        <span className=' text-4xl font-serif text-rose-600 ml-2'> T-</span>
        <span className='italic font-sans'>shi</span>
        <span className='text-blue-400'>rts</span>
        <FaArrowTrendDown className='inline-block mx-2 text-rose-600' />
      </div>
      <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-y-10 lg:mx-6'>
        {
          tShirts.slice().reverse().map((product) => {
            return <Card key={product._id} product={product} />
          })
        }
      </div>
    </div>
  )
}

export default TShirtsPage