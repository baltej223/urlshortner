import { NextResponse } from "next/server";
import { connectDB, model } from "@/database";

export async function Hndle(request) {
  await connectDB();
  // Todo: Check if I connected DB here do I need to connect in the further http method handler?

  console.log(request);
  // I have to get the pathname.
  let pathname = request.nextUrl.pathname;
  let key = pathname.replace("/", "");
  if (key != "") {
    // THis means we are on /[key] only
    try {
      let url = await model.findOne({ key }).exec();

      if (url == undefined) {
        return NextResponse.rewrite(new URL("/", request.url));
      } else {
        return NextResponse.rewrite(new URL(url.url));
      }
    } catch (error) {
      console.error("Error during URL lookup:", error);
      return NextResponse.rewrite(new URL("/", request.url));
    }
  } else {
    // No need to continue (NextResponse.next()) as in @/middleware its already done.
    // (●'◡'●)
    // return NextResponse.next();
  }
}
