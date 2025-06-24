import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    createdBy: { type: String, required: true }, // walletAddress or email
    platform: { type: String, enum: ['zoom', 'google', 'custom'], default: 'custom' },
    meetingLink: { type: String },
  },
  { timestamps: true }
);

export const MeetingModel = mongoose.model('Meeting', meetingSchema);
