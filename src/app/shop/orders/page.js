import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ClientOrders from "@/components/ClientOrders/ClientOrders";
import Order from "@/models/Order.model"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import connectToDB from '@/lib/connectdb';

async function ClientOrdersPage() {

  await connectToDB()

  const session = await getServerSession(authOptions);

  if (!session?.user.email) {
    throw redirect('/auth/signin')
  }

  const allOrders = await Order.find({ "address.email": session?.user.email }).lean()

  const orders = JSON.parse(JSON.stringify(allOrders))

  if (!orders || orders.length === 0) {
    return (
      <div className=" my-20 text-xl text-rose-600 text-center">
        <h2>No Order Added!</h2>
      </div>
    )
  }

  return (
    <div>
      <ClientOrders orders={orders} />
    </div>
  )
}

export default ClientOrdersPage