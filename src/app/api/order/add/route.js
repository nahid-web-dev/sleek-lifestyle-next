
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import Address from "@/models/Address.model";
import Order from "@/models/Order.model";
import connectToDB from "@/lib/connectdb";
import { DateTime } from 'luxon';


export async function POST(req) {
  try {

    await connectToDB()

    const session = await getServerSession(authOptions)

    console.log(session?.user)

    if (!session?.user?.email) {
      return NextResponse.json({
        success: false,
        message: 'Signin first!'
      }, { status: 401 })
    }

    const { email } = session.user

    const address = await Address.findOne({ email }).lean().select('-_id')

    if (!address) {
      return NextResponse.json({
        success: false,
        message: 'Address not found'
      }, { status: 404 })
    }

    const products = await req.json();

    console.log(products)

    // Get the current date/time in a specific timezone
    const nowInDhaka = DateTime.now().setZone('Asia/Dhaka');

    // Format the date in a custom way
    const dhakaDate = nowInDhaka.toFormat('dd-MM-yyyy HH:mm:ss');

    const orderInfo = {
      address,
      products,
      createdAt: dhakaDate
    }

    await Order.create(orderInfo);

    return NextResponse.json({
      success: true,
      message: 'Order added successfully.',
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error?.message,
    });
  }
}
