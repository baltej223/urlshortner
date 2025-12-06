"use server";
import mongoose from "mongoose";

const keySchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    analytics: [
      {
        timestamp: {
          // ← comes from new Date().toISOString()
          type: String,
          required: true,
        },
        ip: { type: String, default: null },
        hostname: { type: String, default: null },

        userAgent: { type: String, default: null },

        browser: {
          name: { type: String, default: "Unknown" },
          version: { type: String, default: "?" },
        },
        os: {
          name: { type: String, default: "Unknown" },
          version: { type: String, default: "?" },
        },

        screen: { type: String, default: null }, // "1920x1080"
        language: { type: String, default: null }, // "en-US"
        languages: { type: [String], default: [] }, // ← important: array!
        timezone: { type: String, default: null }, // "Asia/Kolkata"
        cookieEnabled: { type: Boolean, default: null },

        // Bonus: these come from ipwho.is — add them too (they're in your frontend!)
        city: { type: String, default: null },
        region: { type: String, default: null },
        country: { type: String, default: null },
        country_code: { type: String, default: null },
        isp: { type: String, default: null },
        org: { type: String, default: null },
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Indexes (critical for performance when analytics array gets big)
keySchema.index({ key: 1 });
keySchema.index({ "analytics.timestamp": 1 });
keySchema.index({ "analytics.ip": 1 });

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
}
