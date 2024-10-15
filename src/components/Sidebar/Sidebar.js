"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdOutlineDashboard } from 'react-icons/md';
import { TbSitemap } from 'react-icons/tb';
import { FaFilePen } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";

function Sidebar({ menuState }) {

  const fullPath = usePathname()

  const pathObj = fullPath.split('/')

  const pathname = pathObj[pathObj.length - 1]

  // console.log(pathname)

  return (
    <aside className={`z-50 sm:left-0 sm:sticky fixed top-0 sm:w-72 h-screen bg-blue-800 text-slate-100 ${menuState ? 'left-0' : '-left-72'} transition-all`}>
      <div className="h-full flex flex-col ">
        {/* Logo section at the top of the sidebar */}
        <div className="p-4 bg-blue-500 m-2 text-center text-xl text-white font-bold rounded-xl">
          Admin Panel
        </div>

        {/* Sidebar Navigation Links */}
        <nav className="flex-1 px-2 py-4 sm:pt-10 md:pt-14 text-stone-100 tracking-wide">
          <div className=' flex flex-col gap-3 font-semibold'>
            {/* Sidebar Link 1 */}
            <Link href="/admin" className={` ${pathname === 'admin' && 'bg-blue-600'} flex gap-2 items-center px-5 py-2 rounded hover:bg-blue-600 `}>
              <MdOutlineDashboard />
              <h3>Dashboard</h3>
            </Link>
            {/* Sidebar Link 2 */}
            <Link href="/admin/products" className={` ${pathname === 'products' && 'bg-blue-600'} flex gap-2 items-center px-5 py-2 rounded hover:bg-blue-600 `}>
              <TbSitemap />
              <h3>Products</h3>
            </Link>

            <Link href="/admin/add-product" className={` ${pathname === 'add-product' && 'bg-blue-600'} flex gap-2 items-center px-5 py-2 rounded hover:bg-blue-600 `}>
              <IoMdAddCircleOutline />
              <h3>add-products</h3>
            </Link>

            <Link href="/admin/orders" className={` ${pathname === 'orders' && 'bg-blue-600'} flex gap-2 items-center px-5 py-2 rounded hover:bg-blue-600 `}>
              <FaFilePen />
              <h3>Orders</h3>
            </Link>


          </div>
        </nav>

        <div className="p-4 bg-blue-800 text-center text-sm">
          <p>© 2024 Sleek Lifestyle</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
