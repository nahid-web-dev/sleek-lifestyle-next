import AdminProducts from "@/components/AdminProducts/AdminProducts";
import connectToDB from "@/lib/connectdb";
import Product from "@/models/Product.model";


async function ProductsPage() {

  await connectToDB()
  const allProducts = await Product.find({}).lean()
  const products = JSON.parse(JSON.stringify(allProducts))
  if (!products || products.length === 0) {
    return <div>No products available. Please check back later!</div>;
  }
  return (
    <div>
      <AdminProducts products={products} />
    </div>
  )
}

export default ProductsPage