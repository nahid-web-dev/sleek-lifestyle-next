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

    const { id, hide } = await req.json();
    const product = await Product.findByIdAndUpdate(id, { hide }, { new: true, }).lean();
    return NextResponse.json({
      success: true,
      message: 'Product removed successfully.',
      product,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error?.message,
    });
  }
}
