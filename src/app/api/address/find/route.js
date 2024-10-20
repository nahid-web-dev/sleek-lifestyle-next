import Address from "@/models/Address.model";
import { NextResponse } from "next/server";
import connectToDB from '@/lib/connectdb';


export async function POST(request) {
  try {
    await connectToDB()
    const email = await request.json()
    const address = await Address.findOne({ email: email }).lean()
    if (!address) {
      return NextResponse.json({
        success: false,
        message: 'Address not found!'
      })
    }
    return NextResponse.json({
      success: true,
      address,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error?.message
    })
  }
}