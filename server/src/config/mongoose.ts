import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error('❌ MONGO_URI not defined in .env');
}

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: 'meta_auth', // you can change this
    });

    isConnected = true;
    console.log('✅ Connected to MongoDB via Mongoose');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};
