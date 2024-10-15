import AdminProducts from "@/components/AdminProducts/AdminProducts";
import Product from "@/models/Product.model";


async function receiveData() {
  try {
    const allProducts = await Product.find({}).lean()
    const serializedProducts = JSON.parse(JSON.stringify(allProducts))
    return serializedProducts
  } catch (error) {
    return null
  }
}

async function ProductsPage() {

  const products = await receiveData()

  return (
    <div>
      <AdminProducts products={products} />
    </div>
  )
}

export default ProductsPage