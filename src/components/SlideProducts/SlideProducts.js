"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Card from '@/components/Card/Card'
import { useEffect } from 'react'

function SlideProducts({ slideProducts }) {

  const increaseTraffic = async () => {
    try {
      const response = await fetch('/api/traffic/add')
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error?.message)
    }
  }
  useEffect(
    () => {
      increaseTraffic()
    }, []
  )
  return (
    <Carousel className=' w-[75%] max-w-[210px] py-5 sm:w-[80%] sm:max-w-full mx-auto p-1 sm:p-5'>
      <CarouselPrevious className='bg-slate-500 text-white sm:h-12 sm:w-12' />
      <CarouselContent className=''>
        {
          slideProducts && slideProducts.map((product, idx) => {
            return (
              <CarouselItem className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4" key={idx}>
                <Card product={product} />
              </CarouselItem>
            )
          })
        }
      </CarouselContent>
      <CarouselNext className='bg-slate-500 text-white sm:h-12 sm:w-12 ' />
    </Carousel>
  )
}

export default SlideProducts