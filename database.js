import mongoose from "mongoose";

let keySchema = new mongoose.Schema({
    key:String,
    url:String
});

export let model = mongoose.models.key || mongoose.model("key", keySchema);

export const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
      return;
    }
    await mongoose.connect('mongodb://127.0.0.1:27017/urlshortner');
    console.log("Connected to MongoDB");
  };
