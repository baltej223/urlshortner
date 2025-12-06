import { NextResponse } from "next/server";
import { connectDB, model } from "@/database.js";

export async function POST(req) {
  await connectDB();

  const KEY_LENGTH = 5;
  const ALPHANUMERIC = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  // Better random key generator
  function genRandKey() {
    let result = "";
    for (let i = 0; i < KEY_LENGTH; i++) {
      result += ALPHANUMERIC.charAt(Math.floor(Math.random() * ALPHANUMERIC.length));
    }
    return result;
  }

  // Properly async existence check
  async function keyExists(key) {
    const doc = await model.findOne({ key }).exec();
    return !!doc;
  }

  // Generate unique key with loop (much safer than recursion)
  async function generateUniqueKey(maxAttempts = 100) {
    for (let i = 0; i < maxAttempts; i++) {
      const key = genRandKey();
      if (!(await keyExists(key))) {
        return key;
      }
    }
    throw new Error("Failed to generate unique key after many attempts");
  }

  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Valid 'url' field is required" },
        { status: 400 }
      );
    }

    const key = await generateUniqueKey();
    const entry = new model({ key, url, analytics: [] });

    await entry.save();

    console.log("Short URL created:", { key, url });

    return NextResponse.json({ key }, { status: 200 });

  } catch (error) {
    console.error("Error creating short URL:", error);

    if (error.message.includes("unique key")) {
      return NextResponse.json(
        { error: "Failed to generate unique key. Try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
