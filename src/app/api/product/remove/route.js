import Product from "@/models/Product.model";
import { NextResponse } from "next/server";
import checkAdmin from "../../../../lib/checkAdmin";

export async function POST(req) {
  try {

    const isAdmin = await checkAdmin()

    if (!isAdmin) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized access."
      })
    }

    const productId = await req.json();
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
