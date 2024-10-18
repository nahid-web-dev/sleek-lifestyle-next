import { NextResponse } from "next/server";

export async function POST(req) {

  try {
    const { user_id } = await req.json();

    // Implement logic to delete user data from your database
    const result = await User.deleteOne({ facebookId: user_id });

    return NextResponse.json({
      success: true,
      message: 'data deleted successfully!'
    })
  } catch (error) {
    console.log(error?.message)
    return NextResponse.json({
      success: true,
      message: 'data deleted successfully!'
    })
  }

}