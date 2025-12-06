import { NextResponse } from 'next/server';
import { connectDB, model } from '@/database.js';

export async function POST(request) {
  await connectDB();

  try {
    const analyticsData = await request.json();
    console.log('Received analytics:', analyticsData);
    const shortKey = analyticsData.key.replace(/^\/+/, "");

    if (!shortKey) {
      return new NextResponse(null, { status: 204 });
    }
    delete analyticsData.url;

    await model.updateOne(
      { key: shortKey },
      { $push: { analytics: analyticsData } }
    );

    return new NextResponse(null, { status: 204 });

  } catch (error) {
    console.error('Failed to save analytics:', error);
    return new NextResponse(null, { status: 204 });
  }
}
