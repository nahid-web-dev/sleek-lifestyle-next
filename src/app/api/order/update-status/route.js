
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import Address from "@/models/Address.model";
import Order from "@/models/Order.model";
import connectToDB from "@/lib/connectdb";


export async function POST(req) {
  try {

    await connectToDB()

    const session = await getServerSession(authOptions)

    if (session?.user?.role !== 'admin') {
      console.log(session.user.role)
      return NextResponse.json({
        success: false,
        message: 'Signin first!'
      }, { status: 401 })
    }


    const { status, id } = await req.json();

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true })

    return NextResponse.json({
      success: true,
      message: 'Order status changed successfully.',
      order: order
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error?.message,
    });
  }
}
