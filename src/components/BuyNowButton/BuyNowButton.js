'use client'

import { useRouter } from "next/navigation"

function BuyNowButton({ productId }) {
  const router = useRouter()
  const handleBuy = async (e) => {
    e.stopPropagation()
    fetch('/api/product/increase-click', {
      method: "POST",
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify(productId)
    })
    router.push(`/shop/${productId}`)
  }
  return (
    <button onClick={handleBuy} className=' sm:px-2 px-1 py-1 sm:hover:px-3 transition-all sm:py-1 text-xs sm:text-base font-medium text-white rounded-lg border border-stone-400 bg-black'>buy now</button>
  )
}

export default BuyNowButton