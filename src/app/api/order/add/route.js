
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

    const session = getServerSession(authOptions)

    const { productsInfo, addressInfo } = await req.json();

    if (session?.user?.email) {
      addressInfo.email = session.user.email
    }

    // console.log(productsInfo)

    // Get the current date/time in a specific timezone
    const nowInDhaka = DateTime.now().setZone('Asia/Dhaka');

    // Format the date in a custom way
    const dhakaDate = nowInDhaka.toFormat('dd-MM-yyyy HH:mm:ss');

    const orderInfo = {
      address: addressInfo,
      product: productsInfo,
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
