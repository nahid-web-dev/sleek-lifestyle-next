import SingleProductBox from '@/components/SingleProductBox/SingleProductBox'
import connectToDB from '@/lib/connectdb';
import Product from '@/models/Product.model'
import mongoose from 'mongoose';

const SingleProduct = async ({ params }) => {
  await connectToDB()

  const { id } = params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return (
      <div className='h-screen flex justify-center items-center text-rose-500 text-xl sm:text-3xl'>
        <h1>Page Not Found</h1>
      </div>
    );
  }

  const receivedProduct = await Product.findById(id).lean()

  const product = JSON.parse(JSON.stringify(receivedProduct))

  if (!product) {
    return (
      <div className=" my-20 text-xl text-rose-600 text-center">
        <h2>No Product Here!</h2>
      </div>
    )
  }


  return (
    <div className='min-h-screen my-10 '>
      <SingleProductBox product={product} />
    </div>
  )
}

export default SingleProduct