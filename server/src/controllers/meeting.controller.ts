import { Response } from 'express';
import { MeetingModel } from '../models/meeting.model.js';
import { AuthRequest } from '../middleware/auth.middleware.js';

// 🔹 Create a new meeting
export const createMeeting = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user!;
    const meeting = await MeetingModel.create({
      ...req.body,
      createdBy: user.walletAddress,
    });

    return res.status(201).json({
      status: 201,
      message: 'Meeting created successfully',
      data: meeting,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Failed to create meeting',
      error: (err as Error).message,
    });
  }
};

// 🔹 Get all meetings
export const getMeetings = async (req: AuthRequest, res: Response) => {
  try {
    const meetings = await MeetingModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      status: 200,
      message: 'Meetings fetched successfully',
      data: meetings,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Failed to fetch meetings',
      error: (err as Error).message,
    });
  }
};

// 🔹 Get a meeting by ID
export const getMeetingById = async (req: AuthRequest, res: Response) => {
  try {
    const meeting = await MeetingModel.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({
        status: 404,
        message: 'Meeting not found',
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Meeting fetched successfully',
      data: meeting,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Failed to fetch meeting',
      error: (err as Error).message,
    });
  }
};

// 🔹 Update a meeting by ID
export const updateMeeting = async (req: AuthRequest, res: Response) => {
  try {
    const updated = await MeetingModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        status: 404,
        message: 'Meeting not found',
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Meeting updated successfully',
      data: updated,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Failed to update meeting',
      error: (err as Error).message,
    });
  }
};

// 🔹 Delete a meeting by ID
export const deleteMeeting = async (req: AuthRequest, res: Response) => {
  try {
    const deleted = await MeetingModel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        status: 404,
        message: 'Meeting not found',
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Meeting deleted successfully',
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Failed to delete meeting',
      error: (err as Error).message,
    });
  }
};
