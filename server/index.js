// api/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import questionRoutes from '../Routes/QuestionRoute.js';
import connectQuesDB from '../DB/QuestionDB.js';
import authRoute from '../Routes/AuthRoute.js';
import connectAuthDB from '../DB/AuthDB.js';
import serverless from 'serverless-http';

dotenv.config();

const app = express();

// Connect to MongoDB
connectQuesDB();
connectAuthDB();

app.use(cors());
app.use(express.json());
app.use('/api/questions', questionRoutes);
app.use('/api/auth', authRoute);

// ❌ Remove app.listen()
// ✅ Instead, export a handler
export const handler = serverless(app);