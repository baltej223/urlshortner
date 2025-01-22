import { redirect } from "next/navigation";
import { model } from "@/database";


export default async function Page({ params }) {
  const { key } = params;

  console.log(key);

  let document = await model.findOne({key:key}).exec();
  let originalUrl = document.url;
  redirect(originalUrl);
  return "Redirecting"; 
}