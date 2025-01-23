import mongoose from "mongoose";

let keySchema = new mongoose.Schema({
    key:String,
    url:String
});

export let model = mongoose.models.key || mongoose.model("key", keySchema);

let cached = global.mongoose;
  if (!cached) {
    cached = global.mongoose = { connection: null, promise: null };
  }
  
export async function connectDB() {
  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    const promise = mongoose.connect(process.env.MONGODB_URI);

    cached.promise = promise;
  }

  cached.connection = await cached.promise;
  return cached.connection;
};
