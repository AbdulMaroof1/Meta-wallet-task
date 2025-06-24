import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ethers } from 'ethers';
import { ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET } from '../config/env';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, walletAddress, signature } = req.body;

    if (!email || !password || !walletAddress || !signature) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Step 1: Verify the MetaMask signature
    const message = `Login request for ${walletAddress}`;
    const recoveredAddress = ethers.verifyMessage(message, signature);

    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      return res.status(401).json({ message: 'Invalid wallet signature' });
    }

    // Step 2: Check email & password
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Step 3: Generate JWT token
    const token = jwt.sign({ email, walletAddress }, JWT_SECRET, {
      expiresIn: '1d',
    });

    // Final Response
    return res.status(200).json({
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
    return res.status(500).json({
      status: 500,
      message: 'Login failed',
      error: (error as Error).message,
    });
  }
};
