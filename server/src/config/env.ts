// src/config/env.ts
import dotenv from 'dotenv';
dotenv.config();

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
export const JWT_SECRET = process.env.JWT_SECRET!;
