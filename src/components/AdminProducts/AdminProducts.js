'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import AdminCard from "../AdminCard/AdminCard";

function AdminProducts({ products }) {

  const [showProducts, setShowProducts] = useState(products)
  const [selectedType, setSelectedType] = useState("all")

  const handleTypeChange = (type) => {
    setSelectedType(type);
    if (type === 'all') {
      setShowProducts(products)
    } else if (type === 'hidden') {
      const filteredProducts = products.slice().filter((product) => {
        return product.hide
      })
      setShowProducts(filteredProducts)
    } else {
      const filteredProducts = products.slice().filter((product) => {
        return product.type === type
      })
      setShowProducts(filteredProducts)
    }
  }


  return (
    <div className='flex flex-col items-end w-full gap-6 sm:gap-10 sm:my-10'>
      <div className='sticky top-12 sm:top-14 bg-[rgba(255,255,255,0.8)] z-20 md:mx-14 rounded-lg shadow-[0px_0px_10px_2px_rgba(0,0,0,0.6)] text-stone-600 font-semibold'>
        <Select value={selectedType} onValueChange={handleTypeChange} >
          <SelectTrigger className="w-[140px] sm:w-[180px] px-2 sm:px-5">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent className='text-stone-500 font-semibold'>
            <SelectGroup>
              <SelectLabel className='text-slate-500'>Type</SelectLabel>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="t-shirt">T-Shirt</SelectItem>
              <SelectItem value="polo-shirt">Polo-Shirt</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="hidden">Hidden</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className=' grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-y-10 w-full'>
        {
          showProducts && showProducts.slice().reverse().map((singleProduct) => {
            return <AdminCard singleProduct={singleProduct} key={singleProduct._id} />
          })
        }
      </div>
    </div>
  )
}

export default AdminProducts