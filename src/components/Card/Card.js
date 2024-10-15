'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IoStarSharp } from "react-icons/io5";
import { TbCurrencyTaka } from "react-icons/tb";


export default function Card({ product }) {

  const router = useRouter()

  const handleBuy = async (e) => {
    e.stopPropagation()
    fetch('/api/product/increase-click', {
      method: "POST",
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify(product._id)
    })
    router.push(`/shop/${product._id}`)
  }

  const name = product?.name

  const productName = name && name.split('').slice(0, 20)

  return (

    <div className='rounded-lg overflow-hidden w-[150px] sm:w-[240px] mx-auto bg-white flex flex-col gap-2 '>

      <div className='relative p-4  w-full h-[180px] sm:h-[300px] '>
        <Image
          onClick={handleBuy}
          className='object-center object-cover rounded-lg sm:hover:scale-125 cursor-pointer transition-all'
          src={product?.images[0]}
          alt="img"
          priority
          sizes='100%'
          fill
        />
      </div>

      <div className=' sm:h-[95px] h-[80px] flex flex-col w-full border border-blue-400 rounded-lg bg-white overflow-hidden relative cursor-default'>
        <h2 className=' w-full text-xs sm:text-sm px-2 sm:font-semibold text-stone-600 sm:text-stone-800'>{
          productName && productName.map((letter, idx) => {
            return <span key={idx}>{letter}</span>
          })
        } {
            name.length >= 20 ? ".." : null
          }</h2>
        <div className=' flex sm:gap-2 gap-1 items-center justify-center sm:text-lg '>
          <h2 className=' text-stone-800 font-medium flex items-center text-md sm:text-xl'><TbCurrencyTaka />{product.currentPrice}</h2>
          {product.discount > 0 ?
            <>
              <h2 className=' line-through text-stone-500 flex items-center text-xs sm:text-sm'><TbCurrencyTaka />{product.oldPrice}</h2>
              <p className=' text-green-500 flex items-center text-sm sm:text-md font-medium'>{product.discount}%off</p>
            </> :
            <>
              <IoStarSharp className=' text-stone-500' />
              <IoStarSharp className=' text-stone-700' />
            </>
          }

        </div>
        <div className=' px-2 sm:px-4 h-[100%] flex justify-end items-center gap-2 sm:gap-5'>
          <div className=' flex sm:gap-2 gap-1 sm:text-lg text-xs font-medium text-stone-800 cursor-default'>
            <p className=' sm:w-7 w-5 h-5 border sm:h-7 flex justify-center items-center border-blue-400 rounded-sm sm:rounded-md'>M</p>
            <p className=' sm:w-7 w-5 h-5 border sm:h-7 flex justify-center items-center border-blue-400 rounded-sm sm:rounded-md'>L</p>
            <p className=' sm:w-7 w-5 px-2 h-5 border sm:h-7 flex justify-center items-center border-blue-400 rounded-sm sm:rounded-md'>XL</p>
          </div>
          <button onClick={handleBuy} className=' sm:px-2 px-1 py-1 sm:hover:px-3 transition-all sm:py-1 text-xs sm:text-base font-medium text-white rounded-lg border border-stone-400 bg-black'>buy now</button>
        </div>
      </div>
    </div>
  )
}