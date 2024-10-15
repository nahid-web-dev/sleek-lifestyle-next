'use client'
import Link from 'next/link'
import { FaFacebookMessenger, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa'
import { FaSquareFacebook } from 'react-icons/fa6'

const Footer = () => {
  return (
    <div className='my-4 relative border-t-2 border-blue-200 py-3'>
      <div>
        <ul className=' text-4xl text-blue-500 flex justify-center gap-6'>
          <li><Link href='#'><FaSquareFacebook /></Link></li>
          <li><Link href='#'><FaFacebookMessenger className='text-indigo-700' /></Link></li>
          <li><Link href='#'><FaWhatsapp className=' text-green-500' /></Link></li>
        </ul>
        <h2 className=' justify-center mt-4 flex items-center text-lg sm:text-2xl gap-2 text-stone-500 font-medium'>
          <FaPhoneAlt className=' text-green-500' /> 01607-402797        </h2>
        <h2 className=' text-xl sm:text-3xl text-center py-2 sm:py-4 text-stone-700 border-b-2 border-stone-300'>Contact Us</h2>
        <p className=' text-xs sm:text-lg text-center text-blue-600 mt-2'>Copyright 2024 © sleek-lifestyle.com - All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer