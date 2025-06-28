import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import questionRoutes from './Routes/QuestionRoute.js';
import connectQuesDB from './DB/QuestionDB.js';
import authRoute from './Routes/AuthRoute.js';
import connectAuthDB from './DB/AuthDB.js';

dotenv.config();

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectQuesDB();
connectAuthDB();

app.use(cors());
app.use(express.json());
app.use('/api/questions', questionRoutes);
app.use('/api/auth', authRoute);
// Signup route (remains as is, still uses Supabase)
// import { createClient } from '@supabase/supabase-js';
// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseAnonKey);
// if (!supabaseUrl || !supabaseAnonKey) {
//     console.error('Supabase URL or Anon Key is missing. Please check your .env file.');
//     process.exit(1);
// }

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});