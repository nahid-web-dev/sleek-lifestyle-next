import AdminProducts from "@/components/AdminProducts/AdminProducts";
import Product from "@/models/Product.model";


async function ProductsPage() {

  const allProducts = await Product.find({}).lean()
  const products = JSON.parse(JSON.stringify(allProducts))

  return (
    <div>
      <AdminProducts products={products} />
    </div>
  )
}

export default ProductsPage