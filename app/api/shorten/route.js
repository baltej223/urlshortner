import { NextResponse } from 'next/server';
 import { connectDB, model } from '@/database.js';

await connectDB();

export async function POST(req) {

    function genRandKey(){
        const KEY_LENGTH = 5;
        const alphanumericArray = [
          'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
          'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
          '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
        ];
        let str = "";
        for (let i=0;i<KEY_LENGTH;i++){
          let randomIndex = Math.floor(((Math.random()*alphanumericArray.length)+0));
          str += alphanumericArray[randomIndex];
        } 
        return str;
    }
    let randKey = genRandKey();
    // function checkIfKeyExist(key){
    //     return model.findOne({key:{$eq:randKey}})?key:false;
    // }
    // if (checkIfKeyExist(randKey)){
         
    // }
    const re = await req.json();
    console.log("received request:", re);
    
    let entry = new model({key:randKey, url:re.url});
    
    entry.save()
    .then((doc)=>{
      // return NextResponse.json({ key: randKey , doc:doc}, { status: 200 });
    }).catch((e)=>{
      return NextResponse.json({ "error":"Some error occured!","caughtError":e }, { status: 500 });
    });
    return NextResponse.json({ key: randKey}, { status: 200 });
    // return NextResponse.json({ "error":"Some error occured!" }, { status: 500 });
  
}