import Card from "../Card/Card"

function HomePageProducts({ products }) {

  const tShirts = products?.filter((item) => {
    return item.type == 't-shirt'
  })
  const poloShirts = products?.filter((item) => {
    return item.type == 'polo-shirt'
  })
  const casuals = products?.filter((item) => {
    return item.type == 'casual'
  })

  return (

    <div>

      <div>
        <h2 className=" text-2xl my-3 sm:my-4 md:my-6 lg:my-7 text-center text-blue-600 underline ">T-Shirts</h2>
        <div className=' flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 xl:gap-x-5 2xl:gap-x-8 gap-y-5 md:gap-y-10 lg:mx-6'>
          {
            tShirts && tShirts.slice().reverse().map((product) => {
              return <Card product={product} key={product._id} />
            })
          }
        </div>
      </div>

      <div>
        <h2 className=" text-2xl my-3 sm:my-4 md:my-6 lg:my-7 text-center text-blue-600 underline ">Trousers</h2>
        <div className=' flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 xl:gap-x-5 2xl:gap-x-8 gap-y-5 md:gap-y-10 lg:mx-6'>
          {
            poloShirts && poloShirts.slice().reverse().map((product) => {
              return <Card product={product} key={product._id} />
            })
          }
        </div>
      </div>

      <div>
        <h2 className=" text-2xl my-3 sm:my-4 md:my-6 lg:my-7 text-center text-blue-600 underline ">Others </h2>
        <div className=' flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 xl:gap-x-5 2xl:gap-x-8 gap-y-5 md:gap-y-10 lg:mx-6'>
          {
            casuals && casuals.slice().reverse().map((product) => {
              return <Card product={product} key={product._id} />
            })
          }
        </div>
      </div>

    </div>
  )
}

export default HomePageProducts