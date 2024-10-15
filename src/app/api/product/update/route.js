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

    const data = await req.json();
    console.log(data)
    const updateProduct = await Product.findByIdAndUpdate(data._id, { $set: data }, { new: true });

    return NextResponse.json({
      success: true,
      product: updateProduct,
      message: 'Product updated successfully.',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error?.message,
    });
  }
}
