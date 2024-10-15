"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import usePathname
import { FaUserAlt } from 'react-icons/fa';
import { MdOutlineShoppingCart, MdOutlineStarRate } from 'react-icons/md';
import './Navbar.css';


function Navbar() {
  const pathname = usePathname(); // Get the current pathname

  return (
    <nav className={`shadow-md shadow-blue-300 px-6 sm:px-2 md:px-16 sticky top-0 z-10 bg-white bg-opacity-80 drop-shadow-2xl `}>
      <div className='flex items-center justify-between md:justify-around h-16'>
        <h2 className='text-rose-700 text-3xl cursor-pointer'>
          <Link href="/shop/">Sleek</Link>
        </h2>
        <ul className='text-blue-400 items-center sm:flex sm:gap-10 sm:text-lg hidden '>
          <li>
            <Link href="/shop" className={pathname === '/shop' ? 'active' : ''}>Home</Link>
          </li>
          <li>
            <Link href="/shop/t-shirts" className={pathname === '/shop/t-shirts' ? 'active' : ' '}>T-Shirts</Link>
          </li>
          <li>
            <Link href="/shop/polo-shirts" className={pathname === '/shop/polo-shirts' ? 'active' : ''}>Polo-Shirts</Link>
          </li>
          <li>
            <Link href="/shop/casual" className={pathname === '/shop/casual' ? 'active' : ''}>Casual & Other</Link>
          </li>
        </ul>
        <ul className="cart-section text-stone-500 flex items-center sm:gap-8 gap-6 sm:text-3xl text-2xl">
          <li className='relative'>
            <Link href='/shop/orders'>
              <MdOutlineShoppingCart className='text-blue-400' />
            </Link>
          </li>
          <li>
            <Link href='/auth/user-info'>
              <FaUserAlt className='text-indigo-400' />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
