import checkAdmin from '@/lib/checkAdmin';
import Traffic from '@/models/Traffic.model';
import { DateTime } from 'luxon';
import { NextResponse } from 'next/server';
import connectToDB from '@/lib/connectdb';

export async function GET(req) {

  try {

    await connectToDB()
    const nowInDhaka = DateTime.now().setZone('Asia/Dhaka');
    const dhakaDate = nowInDhaka.toFormat('dd-MM-yyyy HH:mm:ss');

    const isAdmin = checkAdmin()

    if (isAdmin) {
      return NextResponse.json({
        success: false,
        message: 'Admin is not counted as traffic!'
      })
    }

    // Extract the IP address from headers or connection
    const ip = req.headers.get('x-forwarded-for') || req.connection.remoteAddress;


    const trafficInfo = {
      ip,
      createdAt: dhakaDate,
    }

    await Traffic.create(trafficInfo)

    return NextResponse.json({
      success: true,
      message: 'Traffic added',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Unknown error'
    })
  }
}