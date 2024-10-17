import AdminOrder from "@/components/AdminOrder/AdminOrder"
import connectToDB from "@/lib/connectdb"
import Order from "@/models/Order.model"


async function OrdersPage() {

  await connectToDB()
  const allOrders = await Order.find({}).lean()
  const orders = JSON.parse(JSON.stringify(allOrders))

  return (
    <div className='flex flex-wrap justify-evenly sm:gap-10 gap-5'>
      <AdminOrder orders={orders} />
    </div>
  )
}

export default OrdersPage