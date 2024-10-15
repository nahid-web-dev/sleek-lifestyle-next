import Address from "@/models/Address.model";
import { DateTime } from "luxon";
import { NextResponse } from "next/server";


export async function POST(request) {
  try {
    // Get the current date/time in a specific timezone
    const nowInDhaka = DateTime.now().setZone('Asia/Dhaka');
    const dhakaDate = nowInDhaka.toFormat('dd-MM-yyyy HH:mm:ss');
    const address = await request.json()
    address.createdAt = dhakaDate
    const foundAddress = await Address.findOneAndUpdate({ email: address.email },
      address,
      { upsert: true, new: true }
    )
    return NextResponse.json({
      success: true,
      message: 'Address saved successfully!'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error?.message
    })
  }
}