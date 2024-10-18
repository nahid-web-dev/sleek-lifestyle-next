"use client"

import CloudWidget from "../../../components/CloudWidget/CloudWidget";
import { useRef, useState } from "react";
import { VscPercentage } from "react-icons/vsc";
import { TbCurrencyTaka } from "react-icons/tb";
import axios from 'axios'


function AddProductPage() {

  const [imageUrls, setImageUrls] = useState([]);

  const type = useRef()
  const name = useRef()
  const oldPrice = useRef()
  const currentPrice = useRef()
  const showHome = useRef()
  const discount = useRef()
  const showSlide = useRef()


  const handleSubmit = async (e) => {
    console.log(imageUrls)

    const latestImageUrls = imageUrls.slice(imageUrls.length - 3, imageUrls.length)

    try {
      e.preventDefault()
      const product = {
        type: type.current.value,
        name: name.current.value,
        oldPrice: oldPrice.current.value,
        currentPrice: currentPrice.current.value,
        discount: discount.current.value,
        showHome: showHome.current.checked,
        showSlide: showSlide.current.checked,
        images: latestImageUrls
      }
      const res = await axios.post('/api/product/add', product)
      if (res.data.success) {
        setImageUrls([])
        alert(res?.data?.message)
      }
      console.log(res.data?.message)
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

    <form className=' flex flex-col items-center  my-16' onSubmit={handleSubmit}>

      <h2 className=" sm:text-xl font-semibold text-rose-700 underline cursor-default">Fill from left to right</h2>

      <div className=' grid  grid-rows-4 grid-cols-2 lg:grid-rows-2 lg:grid-cols-4 gap-x-2 sm:gap-x-5 gap-y-8 max-w-[95%] my-5 sm:my-10 border-4 border-stone-300 p-2 sm:p-4 rounded-2xl text-sm sm:text-lg '>


        <div className=' flex flex-col items-center text-stone-600'>
          <h2 className=' my-2'>Product Type</h2>
          <select ref={type} name="type" id="type" className='product-type  sm:min-w-40 h-10 bg-indigo-500 px-5 outline-none rounded-lg  text-white font-semibold'>
            <option value="t-shirt">t-shirt</option>
            <option value="polo-shirt">polo-shirt</option>
            <option value="casual">casual</option>
          </select>
        </div>

        <div className=' flex flex-col text-stone-600 relative'>
          <h2 className=' my-2'>Product Name</h2>
          <input className='sm:w-40 w-28 h-10 bg-blue-700 outline-none sm:px-4 px-2  rounded-lg text-stone-60 text-white placeholder:text-white font-semibold' placeholder="T2" ref={name} />
        </div>

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

        <CloudWidget imageUrls={imageUrls} setImageUrls={setImageUrls} maxLimit={1} />
        <CloudWidget imageUrls={imageUrls} setImageUrls={setImageUrls} maxLimit={2} />

        <div className="check-box flex items-center gap-2">
          <input ref={showHome} id='show-home' type="checkbox" className='h-5 w-5' />
          <label htmlFor="show-home" className=' font-semibold text-stone-700'>Home page</label>
        </div>

        <div className="check-box flex items-center gap-2">
          <input ref={showSlide} id='show-slide' type="checkbox" className='h-5 w-5' />
          <label htmlFor="show-slide" className=' font-semibold text-stone-700'>Slide Item</label>
        </div>

      </div>
      <button type='submit' className=' text-xl bg-green-500 px-4 py-2 sm:hover:px-6 hover:shadow-xl shadow-blue-300 transition-all rounded-lg font-semibold text-white'>Add Product</button>
    </form>

  )
}

export default AddProductPage