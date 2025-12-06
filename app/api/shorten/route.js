import { NextResponse } from "next/server";
import { connectDB, model } from "@/database.js";

export async function POST(req) {
  await connectDB();

  function genRandKey() {
    const KEY_LENGTH = 5;
    const alphanumericArray = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];
    let str = "";
    for (let i = 0; i < KEY_LENGTH; i++) {
      let randomIndex = Math.floor(
        Math.random() * alphanumericArray.length + 0,
      );
      str += alphanumericArray[randomIndex];
    }
    return str;
  }

  function checkIfKeyExist(key) {
    return model.findOne({ key: { $eq: key } }).exec() ? true : false;
  }

  function genKey() {
    let _randKey = genRandKey();
    if (checkIfKeyExist(_randKey)) {
      return randKey();
    } else {
      return _randKey();
    }
  }

  const re = await req.json();
  console.log("received request:", re);

  try {
    let randKey = genKey();
    let entry = new model({ key: randKey, url: re.url , analytics:[]});

    // Wait for the save operation to complete
    const savedDoc = await entry.save();
    console.log("Document saved, saved doc:", savedDoc);
    return NextResponse.json({ key: randKey }, { status: 200 });
  } catch (error) {
    console.error("Error saving document:", error);
    return NextResponse.json(
      {
        error: "Some error occurred!",
        caughtError: error,
      },
      { status: 500 },
    );
  }
}
