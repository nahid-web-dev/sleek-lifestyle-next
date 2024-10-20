'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { MdCheck } from 'react-icons/md'
import { TiMinus } from "react-icons/ti";
import '@/app/auth/user-info/user-info.css'

function SingleProductBox({ product }) {


  const [size, setSize] = useState()
  const [slImg, setSlImg] = useState(product?.images[0])
  const [quantity, setQuantity] = useState(1)
  const [copied, setCopied] = useState(false)


  ////////////

  const name = useRef()
  const phone = useRef()
  const villageName = useRef()
  const upazila = useRef()

  const [address, setAddress] = useState()


  const whatsAppLinkText = encodeURIComponent(`Hello, Please check this product: https://sleek-lifestyle.com/shop/${product._id}`);
  const whatsAppLink = `https://wa.me/8801845575463?text=${whatsAppLinkText}`

  const router = useRouter()


  const orderNow = async (e) => {
    e.preventDefault()
    try {

      if (!size) {
        return alert('Please select a size.')
      }
      const addressInfo = {
        name: name.current.value,
        phone: phone.current.value,
        villageName: villageName.current.value,
        upazila: upazila.current.value,
      }

      const productsInfo = [
        {
          type: product.type,
          productId: product._id,
          price: product.currentPrice,
          size: size,
          quantity: quantity
        }
      ]

      const response = await fetch('/api/order/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify({ productsInfo, addressInfo })
      })
      const status = response.status
      if (status === 404) {
        return router.push('/auth/user-info')
      }
      const data = await response.json()
      alert(data.message)
    } catch (error) {
      alert(error?.message)
    }

  }

  const copyProductLink = async () => {
    const productLink = `https://sleek-lifestyle.com/shop/${product._id}`
    try {
      await navigator.clipboard.writeText(productLink); // Copy the product link to the clipboard
      setCopied(true); // Set copied state to true
      setTimeout(() => setCopied(false), 3000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err); // Log any errors that occur
    }
  }


  return (
    <div>
      {
        product &&
        <div className='flex flex-col md:flex-row md:justify-around gap-6 sm:gap-10 sm:px-6 px-2'>

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
            <div className=' flex flex-wrap h-28 justify-evenly md:justify-center md:h-36 w-full max-w-80 md:max-w-full md:border-none border border-blue-300 overflow-hidden gap-2 md:gap-4 md:bg-blue-200 p-2 md:p-3 rounded-lg'>
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


          <div className='flex justify-center'>
            <div className=' text-lg md:text-2xl flex flex-col gap-1 md:gap-2'>
              <pre>Type      : {product.type}</pre>
              {product.discount > 0 && <pre className=' flex'>Old Price : <p>{product.oldPrice} tk</p></pre>}
              <pre className=' flex '>Discount  : <p>{product.discount} %</p></pre>
              <pre className=' border-t-2 border-blue-300 flex '>Price     : <p>{product.currentPrice} tk</p></pre>
              <pre className=' flex '>Quantity  : <div className=' text-lg md:text-xl flex items-center border border-blue-400 rounded-md'>
                <TiMinus className=' border-blue-400 w-10 h-7 cursor-pointer ' onClick={(e) => {
                  e.stopPropagation()
                  setQuantity((prevCount) => {
                    if (prevCount > 1) {
                      return prevCount - 1
                    }
                    return prevCount
                  })
                }} />
                <h4 className=' text-center text-2xl border-x w-10 border-blue-400 cursor-default' >{quantity}</h4>
                <FaPlus className=' border-blue-400 w-10 h-7 cursor-pointer ' onClick={(e) => {
                  e.stopPropagation()
                  setQuantity(quantity + 1)
                }
                } />
              </div>
              </pre>

              <div className='flex flex-col items-center gap-4 sm:gap-5 my-3 sm:my-6 text-center text-white'>
                {/* <button className='w-[80%] bg-indigo-600 py-1 transition-all sm:hover:w-[90%] rounded-lg' onClick={addToCart}>Add to Cart</button> */}
                {/* <button className={` text-stone-700 text-lg border-2 border-stone-400 py-1 transition-all sm:hover:w-[80%] rounded-lg  ${copied ? 'w-[50%] !text-green-700 !border-green-500 flex justify-center items-center' : 'w-[65%]'}`} onClick={copyProductLink}> {copied ? 'Copied' : 'Copy Product Link'} {copied && <MdCheck />} </button> */}
                <Link href={whatsAppLink} target='_blank' className='w-[80%] text-lg bg-blue-500 py-2 transition-all sm:hover:w-[90%] rounded-lg'>Order Via What&apos;s app</Link>

                <h2 className=' text-3xl text-center text-rose-700'>Or,</h2>

                <div className=' flex flex-col text-start text-base justify-center gap-3'>
                  <h2 className="text-lg sm:text-2xl text-gray-700 text-center">Add Order Information</h2>
                  <form onSubmit={orderNow} className='bg-slate-50 border border-blue-400 py-4 sm:px-10 px-3 rounded-xl add-form w-[90vw] sm:w-[450px] flex flex-col items-center gap-4'>
                    <div className='w-full flex !flex-col '>
                      <h2 className='text-xl text-gray-700'>Size</h2>
                      <div className=' sm:text-xl font-medium flex !flex-row justify-center gap-5 cursor-default'>
                        <h2 onClick={() => { setSize('M') }} className={`${size === 'M' && 'bg-blue-500 text-white border-none'} border-2 border-blue-300 rounded-md px-3 py-1 transition-all bg-white text-stone-500`}>M</h2>
                        <h2 onClick={() => { setSize('L') }} className={`${size === 'L' && 'bg-blue-500 text-white border-none'} border-2 border-blue-300 rounded-md px-4 py-1 transition-all bg-white text-stone-500`}>L</h2>
                        <h2 onClick={() => { setSize('XL') }} className={`${size === 'XL' && 'bg-blue-500 text-white border-none'} border-2 border-blue-300 rounded-md px-2 py-1 transition-all bg-white text-stone-500`}>XL</h2>
                      </div>
                    </div>
                    <div className='w-full'>
                      <input ref={name} type="text" id='name' placeholder='Reciever name' required />
                      <label htmlFor="name">Name</label>
                    </div>
                    <div className='w-full'>
                      <input ref={phone} type="number" id='number' placeholder='Phone number' required />
                      <label htmlFor="number">Number</label>
                    </div>
                    <div className='w-full'>
                      <input ref={villageName} type="text" id='village' placeholder='Street or Village' required />
                      <label htmlFor="village">Address</label>
                    </div>
                    <div className='w-full'>
                      <input ref={upazila} type="text" id='upazila' placeholder='Upazila name' required />
                      <label htmlFor="upazila">Upazila</label>
                    </div>
                    <button type='submit' className=' max-w-[60%] sm:max-w-[80%] !bg-blue-500 py-1 transition-all sm:hover:max-w-[90%] sm:focus:max-w-[100%] rounded-lg' >Order Now</button>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>
      }
    </div>
  )
}

export default SingleProductBox