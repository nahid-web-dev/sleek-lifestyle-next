import Product from "@/models/Product.model";
import { NextResponse } from "next/server";
import connectToDB from '@/lib/connectdb';

export async function POST(request) {
  try {

    await connectToDB()
    const id = await request.json()

    const product = await Product.findById(id)

    return NextResponse.json({
      success: true,
      product: product,
      message: 'Product found.',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error?.message,
    });
  }
}