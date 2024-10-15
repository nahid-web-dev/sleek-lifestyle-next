import Product from "@/models/Product.model";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {

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