import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ClientOrders from "@/components/ClientOrders/ClientOrders";
import Order from "@/models/Order.model"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function ClientOrdersPage() {

  const session = await getServerSession(authOptions);

  const allOrders = await Order.find({ "address.email": session?.user.email }).lean()

  const orders = JSON.parse(JSON.stringify(allOrders))

  return (
    <div>
      <ClientOrders orders={orders} />
    </div>
  )
}

export default ClientOrdersPage