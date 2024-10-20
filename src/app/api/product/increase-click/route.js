import Product from "@/models/Product.model";
import { NextResponse } from "next/server";
import connectToDB from '@/lib/connectdb';


export async function POST(req) {
  try {
    await connectToDB()
    const _id = await req.json()
    await Product.findOneAndUpdate({ _id }, { $inc: { clickCount: 1 } })
    return NextResponse.json({
      success: true,
      message: 'Product click count updated successfully!'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error?.message
    })
  }
}