'use client'

import Image from "next/image"
import { FaPencil } from "react-icons/fa6"
import { TbCurrencyTaka } from "react-icons/tb"
import { useRouter } from "next/navigation";
import { BiHide, BiSolidHide } from "react-icons/bi";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { FaTrash } from "react-icons/fa";


function AdminCard({ singleProduct, setShowProducts }) {

  const router = useRouter()

  const [product, setProduct] = useState(singleProduct)

  const hideProduct = async () => {
    try {
      const response = await fetch('/api/product/hide', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify({
          id: product._id,
          hide: true,
        })
      })
      const data = await response.json()

    } catch (error) {

    }

  }

  const unHideProduct = async () => {
    try {
      const response = await fetch('/api/product/hide', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify({
          id: product._id,
          hide: false,
        })
      })
      const data = await response.json()
      if (data.success) {
        setProduct(data.product)
      }
    } catch (error) {

    }

  }

  const removeProduct = async () => {
    const checkConfirm = confirm('Are you sure removing the product?')
    if (!checkConfirm) {
      return
    }
    try {
      const response = await fetch('/api/product/remove', {
        method: 'POST',
        headers: {
          "Content-Type": "Application/json"
        },
        body: JSON.stringify(product._id)
      })
      const data = await response.json()
      console.log('response received')
      if (data.success) {
        alert(data.message)
        if (data.success) {
          setShowProducts((prevProducts) => {
            const newProducts = prevProducts.filter((item) => {
              return item._id !== product._id
            })
            return [...newProducts]
          })
        }
      }
    } catch (error) {

    }
  }

  const updateProduct = async () => {
    return router.push(`/admin/products/${product._id}`)
  }

  return (

    <div className=' fill-neutral-500 rounded-lg mx-auto overflow-hidden w-[150px] lg:w-[240px] flex flex-col gap-2'>
      <div className='relative h-[180px] lg:h-[300px] '>
        <Image
          className='h-[187px] lg:h-[334px] w-full object-center object-cover rounded-lg sm:hover:scale-125 transition-all'
          src={product.images[0]}
          alt="image"
          priority={false}
          fill
          sizes='100%'
        />
      </div>
      <div className='py-2 bg-stone-100 transition-all flex justify-evenly flex-col w-full border border-green-500 rounded-lg z-10 overflow-hidden'>
        <div className=' flex lg:gap-2 items-center justify-evenly lg:justify-center  '>
          <h2 className=' text-stone-900 sm:font-medium flex text-base lg:text-lg items-center'><TbCurrencyTaka />{product.currentPrice}</h2>
          <h2 className=' line-through text-stone-600 flex items-center text-xs'><TbCurrencyTaka />{product.oldPrice}</h2>
          <p className=' text-green-500 flex items-center text-xs lg:font-medium'>{product.discount}% off</p>
        </div>
        <div className='flex flex-col justify-center items-center text-stone-600 '>
          <h2 className=' text-xs lg:text-sm '>{product.type}</h2>
          <h2 className='lg:text-lg text-sm font-semibold text-rose-600'>Click : {product.clickCount}</h2>
          <h2 className='lg:text-lg text-sm font-semibold text-rose-600'>Order : {product.orderCount}</h2>
          <h2 className=' text-sm font-semibold text-stone-500'>Status : {product.hide ? 'Hidden' : 'Visible'}</h2>
        </div>
        <div className=' flex justify-center gap-10 text-2xl lg:text-3xl py-1'>
          <FaPencil onClick={updateProduct} className='p-0.5 ring-1 ring-blue-500 text-blue-500 rounded-full cursor-pointer' />
          {
            product.hide ? <BiSolidHide onClick={unHideProduct} className='p-0.5 ring-1 ring-red-700 text-rose-600 rounded-full cursor-pointer' /> : < IoMdEye onClick={hideProduct} className='p-0.5 ring-1  ring-green-600 text-green-500 rounded-full cursor-pointer' />
          }
          <FaTrash onClick={removeProduct} className='p-1 ring-1 ring-red-700 text-red-700 rounded-full cursor-pointer' />
        </div>
      </div>
    </div>

  )
}

export default AdminCard