import { NextResponse } from "next/server";
import { connectDB, model } from "@/database";

export function Hndle(request) {
    connectDB();
    // Todo: Check if I connected DB here do I need to connect in the further http method handler?
    
    console.log(request);
    // I have to get the pathname.
    let pathname = request.nextUrl.pathname;
    let key = pathname.replace("/", "");
    if (key != "") { 
        // THis means we are on /[key] only
        let url = model.findOne({ key }).exec();

        console.log(url);

        if (url != undefined) {
            NextResponse.rewrite(new URL('/', request.url));
        }
        else {
            NextResponse.rewrite(new URL(url.url));
        }
    }
    else{
        // No need to continue (NextResponse.next()) as in @/middleware its already done.
        // (●'◡'●)
    }
}