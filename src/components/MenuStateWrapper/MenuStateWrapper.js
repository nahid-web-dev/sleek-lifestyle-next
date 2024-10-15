"use client"

import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar/Sidebar';
import AdminHeader from '@/components/AdminHeader/AdminHeader';
import Footer from '../Footer/Footer';

function MenuStateWrapper({ children }) {
  // Create the state variable here
  const [menuState, setMenuState] = useState(false);

  return (
    <div className=" flex bg-stone-100 min-h-[50vh] ">
      <Sidebar menuState={menuState} />
      <div className={` w-full`}>
        <AdminHeader setMenuState={setMenuState} menuState={menuState} />
        <div className={`${menuState && 'sm:blur-xl sm:bg-slate-200'} sm:px-18 px-1`}>
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default MenuStateWrapper