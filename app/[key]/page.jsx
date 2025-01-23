"use server";
import { redirect } from "next/navigation";
import { model } from "@/database";


export default async function Page({ params }) {
  const { key } = await params;

  console.log(key);

  let document = await model.findOne({key:key}).exec();
  console.log("document:", document);
  if (document){
    let originalUrl = document.url;
    redirect(originalUrl);
  }
  redirect("./"); 
}