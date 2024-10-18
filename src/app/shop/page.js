import Image from 'next/image'

import sleekBanner from '@/public/images/sleek_banner.png'
import sleekSideBanner from '@/public/images/sleek_side_banner.png'
import SlideProducts from '@/components/SlideProducts/SlideProducts'
import Product from '@/models/Product.model'
import { FaArrowTrendDown } from 'react-icons/fa6'
import HomePageProducts from '@/components/HomePageProducts/HomePageProducts'
import connectToDB from '@/lib/connectdb'


export const dynamic = 'force-dynamic'

async function PagesContainer() {

  await connectToDB()

  const allProducts = await Product.find({}).lean()

  const serializedProducts = JSON.parse(JSON.stringify(allProducts))

  const products = serializedProducts.filter((element) => {
    return element.showHome && !element.hide && !element.showSlide
  });
  const slideProducts = serializedProducts.filter((element) => {
    return element.showSlide && !element.hide
  });

  if (!products || products.length === 0) {
    return (
      <div className=" my-20 text-xl text-rose-600 text-center">
        <h2>No Product Here!</h2>
      </div>
    )
  }

  return (

    <div>

      <div className=' flex gap-5 justify-center sm:gap-16 items-center my-10 sm:my-12'>
        <div className=' w-[60%] sm:w-[52%] overflow-hidden'>
          <Image
            src={sleekBanner}
            alt='banner'
            className=' rounded-lg sm:rounded-xl w-full'
            priority
          />
        </div>
        <div className='w-[18%] overflow-hidden'>
          <Image
            src={sleekSideBanner}
            alt='side banner'
            className=' rounded-lg sm:rounded-xl '
            priority
          />
        </div>

      </div>

      <div className='flex flex-col'>
        <div className=' text-2xl font-semibold text-stone-600 text-center my-4 sm:my-6'>
          <span className=' italic font-sans' >Latest </span>
          <span className=' text-4xl font-serif text-rose-600 ml-2'> C</span>
          <span className='italic font-sans'>ollec</span>
          <span className='text-blue-400'>tions</span>
          <FaArrowTrendDown className='inline-block mx-2 text-rose-600' />
        </div>
        <SlideProducts slideProducts={slideProducts} />
      </div>

      <div className='flex flex-col'>
        <div className=' text-2xl font-semibold text-stone-600 text-center my-4 sm:my-10'>
          <span className=' italic font-serif text-3xl ' >Differ</span>
          <span className=' italic font-serif text-3xl text-green-500' >ent </span>
          <span className=' text-4xl font-sans text-blue-400 ml-2'> C</span>
          <span className='italic font-sans'>atego</span>
          <span className='text-blue-400'>ries</span>
          <FaArrowTrendDown className='inline-block mx-2 text-blue-400' />
        </div>

        <HomePageProducts products={products} />
      </div>

    </div>
  )
}


export default PagesContainer