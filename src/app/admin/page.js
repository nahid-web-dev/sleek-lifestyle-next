import AdminDashboard from "@/components/AdminDashboard/AdminDashboard"
import connectToDB from "@/lib/connectdb"
import Order from "@/models/Order.model"
import Product from "@/models/Product.model"
import Traffic from "@/models/Traffic.model"
import User from "@/models/User.model"

export const dynamic = 'force-dynamic'

async function AdminPage() {
  await connectToDB()
  const allProducts = await Product.find({}).lean()
  const allOrders = await Order.find({}).lean()
  const allUsers = await User.find({ role: 'user' }).lean()
  const allTraffics = await Traffic.find({}).lean()

  const products = JSON.parse(JSON.stringify(allProducts))
  const orders = JSON.parse(JSON.stringify(allOrders))
  const users = JSON.parse(JSON.stringify(allUsers))
  const traffics = JSON.parse(JSON.stringify(allTraffics))

  return (
    <main>
      <AdminDashboard products={products} orders={orders} users={users} traffics={traffics} />
    </main>
  )
}

export default AdminPage