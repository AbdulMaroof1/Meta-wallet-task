import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: String,
    walletAddress: String,
  },
  { timestamps: true }
);

export const UserModel = mongoose.model('User', userSchema);
