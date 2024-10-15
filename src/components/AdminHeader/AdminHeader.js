
import { FaArrowTrendUp } from 'react-icons/fa6'
import { MdMenu, MdRestaurantMenu } from 'react-icons/md'
import { RiMenu4Fill, RiMenu5Fill, RiMenuLine } from 'react-icons/ri'

function AdminHeader({ setMenuState, menuState }) {
  return (
    <div className=' z-20 sticky top-1 bg-sky-500 bg-opacity-70 flex items-center justify-between sm:justify-evenly px-4 sm:w-[90%] mx-auto h-10 w-[95%] rounded-lg sm:rounded-xl my-3 sm:my-5'>
      <a href="/shop" target="_blank" className="flex items-center gap-3 sm:py-4 py-2 sm:text-2xl text-lg font-bold text-white tracking-wider">Sleek <FaArrowTrendUp />
      </a>
      <div onClick={() => setMenuState(!menuState)} className=' sm:hidden text-3xl text-white'>
        {menuState ? <MdRestaurantMenu /> : <RiMenuLine />}
      </div>
    </div>
  )
}

export default AdminHeader