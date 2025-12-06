import { NextResponse } from "next/server";
import { connectDB, model } from "@/database.js";

export async function GET(req, { params }) {
  await connectDB();

  const { key } = await  params; // 'a', 'b', or 'c'

  let savedDoc = await model.findOne({ key: { $eq: key } }).exec();
  if (savedDoc) {
    return NextResponse.json({ url: savedDoc.url }, { status: 200 });
  } else {
    return NextResponse.json({ error: "Some error occured" }, { status: 500 });
  }

  // return NextResponse.json({ "error":"Some error occured!" }, { status: 500 });
}
