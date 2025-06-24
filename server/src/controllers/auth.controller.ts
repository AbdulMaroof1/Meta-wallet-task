import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ethers } from 'ethers';
import { ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET } from '../config/env';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, walletAddress, signature } = req.body;

    if (!email || !password || !walletAddress || !signature) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    // Step 1: Verify MetaMask signature
    const message = `Login request for ${walletAddress}`;
    const recoveredAddress = ethers.verifyMessage(message, signature);

    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      res.status(401).json({ message: 'Invalid wallet signature' });
      return;
    }

    // Step 2: Validate email and password
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Step 3: Generate JWT token
    const token = jwt.sign({ email, walletAddress }, JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      status: 200,
      message: 'success',
      data: {
        token,
        user: {
          email,
          walletAddress,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Login failed',
      error: (error as Error).message,
    });
  }
};
