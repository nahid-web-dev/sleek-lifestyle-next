import Product from "@/models/Product.model";
import { NextResponse } from "next/server";
import checkAdmin from "../../../../lib/checkAdmin";
import connectToDB from '@/lib/connectdb';

export async function POST(req) {
  try {

    await connectToDB()
    const isAdmin = await checkAdmin()

    if (!isAdmin) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized access."
      })
    }

    const productId = await req.json();
    console.log(productId)
    await Product.findByIdAndDelete(productId);

    return NextResponse.json({
      success: true,
      message: 'Product removed successfully.',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error?.message,
    });
  }
}
