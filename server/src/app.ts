import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/mongoose.js';

// Import Routes
import authRoutes from './routes/auth.routes.js';
import meetingRoutes from './routes/meeting.routes.js';


dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/meetings', meetingRoutes);

app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Ensure DB is connected
await connectToDatabase();

export default app;
