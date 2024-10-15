'use client'

import { GiPoloShirt, GiTShirt } from 'react-icons/gi'
import { RiShirtFill } from 'react-icons/ri'
import './Header.css'
import { FaHome } from 'react-icons/fa'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Header = () => {

  const pathname = usePathname()

  console.log(pathname)

  return (
    <ul className='bg-white flex py-2 px-4 justify-around overflow-scroll gap-8 sm:hidden no-scrollbar my-4'>
      <li>
        <Link href='/shop' className={` ${pathname === '/shop' ? 'active' : ''} flex flex-col items-center text-sm text-stone-500`}>
          <FaHome className='border-2 border-indigo-200 rounded-full text-5xl text-stone-600 p-2' />Home
        </Link>
      </li>
      <li>
        <Link href='/shop/t-shirts' className={` ${pathname === '/shop/t-shirts' ? 'active' : ''} flex flex-col items-center text-sm text-stone-500 `}>
          <GiTShirt className='border-2 border-indigo-200 rounded-full text-5xl text-slate-500 p-2 ' />T-Shirt
        </Link>
      </li>
      <li>
        <Link href='/shop/casual' className={` ${pathname === '/shop/casual' ? 'active' : ''} flex flex-col items-center text-sm text-stone-500 `}>
          <RiShirtFill className='border-2 border-indigo-200 rounded-full text-5xl text-stone-500 p-2' />Casual
        </Link>
      </li>
      <li>
        <Link href='/shop/polo-shirts' className={` ${pathname === '/shop/polo-shirts' ? 'active' : ''} flex flex-col items-center text-sm text-stone-500 `}>
          <GiPoloShirt className='border-2 border-indigo-200 rounded-full text-5xl text-slate-700 p-2' />Polo
        </Link>
      </li>

    </ul>
  )
}

export default Header