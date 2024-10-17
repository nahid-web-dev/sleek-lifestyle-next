import Product from "@/models/Product.model";
import { NextResponse } from "next/server";
import checkAdmin from "../../../../lib/checkAdmin";
import connectToDB from '@/lib/connectdb';

export async function POST() {
  try {

    await connectToDB()
    const isAdmin = await checkAdmin()

    if (!isAdmin) {
      const products = await Product.find({}).select('-clickCount -orderCount')
      return NextResponse.json({
        success: true,
        products: products,
        message: 'Product found.',
      });
    }

    const products = await Product.find({})

    return NextResponse.json({
      success: true,
      products: products,
      message: 'Product found.',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error?.message,
    });
  }
}
