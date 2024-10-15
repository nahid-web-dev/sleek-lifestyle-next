import Card from "../Card/Card"

function HomePageProducts({ products }) {
  return (
    <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-y-10 lg:mx-6'>
      {
        products && products.slice().reverse().map((product) => {
          return <Card product={product} key={product._id} />
        })
      }
    </div>
  )
}

export default HomePageProducts