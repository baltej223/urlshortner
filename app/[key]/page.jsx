"use client";
import { redirect } from "next/navigation";
import { connectDB, model } from "@/database";

await connectDB();

export default async function Page({ params }) {
  const { key } = await params;

  console.log(key);
  
  let res = await fetch("/api/getUrl/"+key);
  redirect(res.url?res.url:"./");
}
