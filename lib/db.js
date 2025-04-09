import mongoose from "mongoose";

const uri = process.env.DB;

if (!uri) {
  throw new Error("🚨 MongoDB URI is not defined in .env");
}

// Global cache for Next.js hot reload & serverless
let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
     await mongoose.connect(uri);
    isConnected = true;
    console.log("✅ DB connected successfully");
  } catch (error) {
    console.error("❌ DB connection failed:", error.message);
    throw error;
  }
};
