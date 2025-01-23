"use client";
import { redirect } from "next/navigation";
import { connectDB, model } from "@/database";

await connectDB();

export default async function Page({ params }) {
  const { key } = await params;

  console.log(key);
  
  // fetch("./"+key);

  let document = await model.findOne({key:key}).exec();
  console.log("document found will key at dynamic url:", document);
  if (document){
    let originalUrl = document.url;
    redirect(originalUrl);
  }
  redirect("./"); 
}