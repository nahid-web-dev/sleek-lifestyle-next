import Product from "@/models/Product.model";
import { NextResponse } from "next/server";
import checkAdmin from "../../../../lib/checkAdmin";
import { DateTime } from "luxon";
import connectToDB from '@/lib/connectdb';


export async function POST(req) {
  try {

    await connectToDB()
    const isAdmin = await checkAdmin()

    // Get the current date/time in a specific timezone
    const nowInDhaka = DateTime.now().setZone('Asia/Dhaka');
    const dhakaDate = nowInDhaka.toFormat('dd-MM-yyyy HH:mm:ss');

    if (!isAdmin) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized access."
      })
    }

    const data = await req.json();
    data.createdAt = dhakaDate
    await Product.create(data);

    return NextResponse.json({
      success: true,
      message: 'Product added successfully.',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error?.message,
    });
  }
}
