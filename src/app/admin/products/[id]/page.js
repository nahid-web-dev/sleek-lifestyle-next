"use client"

import { useRef, useState } from "react";
import { VscPercentage } from "react-icons/vsc";
import { TbCurrencyTaka } from "react-icons/tb";
import axios from 'axios'
import { useParams } from "next/navigation";
import CloudWidget from "@/components/CloudWidget/CloudWidget";
import { useEffect } from "react";
import Image from "next/image";


function UpadateProductPage() {

  const { id } = useParams()

  const [imageUrls, setImageUrls] = useState([]);
  const [product, setProduct] = useState(null)
  const [slImg, setSlImg] = useState()


  const oldPrice = useRef()
  const currentPrice = useRef()
  const showHome = useRef()
  const discount = useRef()
  const showSlide = useRef()

  const receiveData = async () => {
    console.log(id)
    const response = await fetch('/api/product/findone', {
      method: "POST",
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify(id)
    })
    const data = await response.json()
    if (data.success) {
      setProduct(data.product)
      setSlImg(data?.product?.images[0])
      oldPrice.current.value = data.product.oldPrice
      currentPrice.current.value = data.product.currentPrice
      discount.current.value = data.product.discount
      showHome.current.checked = data.product.showHome
      showSlide.current.checked = data.product.showSlide
    }
  }

  useEffect(
    () => {
      receiveData()
    }, [receiveData]
  )


  const handleSubmit = async (e) => {
    // console.log(imageUrls)
    // const latestImageUrls = imageUrls.slice(imageUrls.length - 3, imageUrls.length)
    try {
      e.preventDefault()
      const data = {
        _id: id,
        oldPrice: oldPrice.current.value,
        currentPrice: currentPrice.current.value,
        discount: discount.current.value,
        showHome: showHome.current.checked,
        showSlide: showSlide.current.checked,
      }
      const res = await axios.post('/api/product/update', data)
      if (res.data.success) {
        alert(res?.data?.message)
      }
    } catch (error) {
      alert(error?.message)
    }

  }

  const changeDiscount = (e) => {
    const cp = currentPrice.current.value
    const dc = discount.current.value

    if (dc == 100) {
      oldPrice.current.value = 0
      return
    }
    oldPrice.current.value = Math.ceil(cp * 100 / (100 - dc) / 5) * 5
  }

  return (

    <div>
      {
        product ?
          <div className='flex gap-6 flex-col items-center'>
            <div className='relative h-[334px] w-full py-5'>
              <Image
                className='object-contain ' src={`${slImg}`}
                alt="Product_image"
                fill
                sizes='100%'
                priority
              />
            </div>
            <div className=' flex flex-wrap h-28 justify-evenly md:justify-center md:h-36 w-full max-w-80 md:max-w-[420px] md:border-none border border-blue-300 overflow-hidden gap-2 md:gap-4 md:bg-blue-200 p-2 md:p-3 rounded-lg'>
              {
                product.images && product.images.map((imgSrc, idx) => {
                  return (
                    <div key={idx} className={`${slImg === product.images[idx] && ' border-2 border-green-400 p-2'} relative md:w-28 md:max-w-28 rounded-lg transition-all w-[30%] max-w-20 `}>
                      <div className=' relative h-full  md:w-full transition-all '>
                        <Image
                          src={imgSrc}
                          onClick={() => setSlImg(product.images[idx])}
                          className={` object-contain transition-all rounded-lg`}
                          alt='image'
                          fill
                          priority
                          sizes='100%'
                        />
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>

          : <h2 className='text-center text-2xl text-red-700'>Images fetching....</h2>
      }

      <form className=' flex flex-col items-center  my-16' onSubmit={handleSubmit}>

        <h2 className=" sm:text-xl font-semibold text-rose-700 underline cursor-default">Fill from left to right</h2>

        <div className=' grid  grid-rows-4 grid-cols-2 lg:grid-rows-2 lg:grid-cols-4 gap-x-2 sm:gap-x-5 gap-y-8 max-w-[95%] my-5 sm:my-10 border-4 border-stone-300 p-2 sm:p-4 rounded-2xl text-sm sm:text-lg '>

          <div className=' flex flex-col text-stone-600 relative'>
            <h2 className=' my-2'>Discount (%)</h2>
            <input ref={discount} onChange={changeDiscount} type="number" className='sm:w-40 w-28 h-10 bg-blue-700 outline-none sm:px-11 px-4  rounded-lg text-stone-60 text-white placeholder:text-white font-semibold' defaultValue={0} />
            <VscPercentage className='absolute right-6 bottom-2 text-white text-2xl' />
          </div>

          <div className=' flex flex-col text-stone-600 relative'>
            <h2 className=' my-2'>Current Price</h2>
            <input onChange={changeDiscount} ref={currentPrice} type="number" className=' sm:w-40 w-28 h-10 bg-blue-700 outline-none sm:px-8 px-6 font-semibold  rounded-lg text-stone-60 text-white placeholder:text-white' defaultValue={450} required />
            <TbCurrencyTaka className='absolute left-0 bottom-2 sm:bottom-1 text-white sm:text-3xl text-2xl' />
          </div>

          <div className=' flex flex-col justify-end text-stone-600 relative'>
            <h2 className=' my-2'>Old Price</h2>
            <input ref={oldPrice} type="number" className=' sm:w-40 w-28 h-10 bg-blue-700 outline-none sm:px-8 px-6 font-semibold  rounded-lg text-stone-60 text-white placeholder:text-white' defaultValue={0} readOnly />
            <TbCurrencyTaka className='absolute left-0 bottom-2 sm:bottom-1 text-white sm:text-3xl text-2xl' />
          </div>

          {/* <CloudWidget imageUrls={imageUrls} setImageUrls={setImageUrls} maxLimit={1} />
          <CloudWidget imageUrls={imageUrls} setImageUrls={setImageUrls} maxLimit={2} /> */}

          <div className="check-box flex items-center gap-2">
            <input ref={showHome} id='show-home' type="checkbox" className='h-5 w-5' />
            <label htmlFor="show-home" className=' font-semibold text-stone-700'>Home page</label>
          </div>

          <div className="check-box flex items-center gap-2">
            <input ref={showSlide} id='show-slide' type="checkbox" className='h-5 w-5' />
            <label htmlFor="show-slide" className=' font-semibold text-stone-700'>Slide Item</label>
          </div>

        </div>
        <button type='submit' className=' text-xl bg-green-500 px-4 py-2 sm:hover:px-6 hover:shadow-xl shadow-blue-300 transition-all rounded-lg font-semibold text-white'>Update</button>
      </form>

    </div>

  )
}

export default UpadateProductPage