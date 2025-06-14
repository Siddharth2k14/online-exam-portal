// const express = require('express');
// const cors = require('cors');
// const { createClient } = require('@supabase/supabase-js');

import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 3000;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase URL or Anon Key is missing. Please check your .env file.');
    process.exit(1);
};
// Middleware

app.use(cors());
app.use(express.json());

// Signup route
app.post('/api/auth/signup', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } }
    });
    if (error) {
        return res.status(400).json({ message: error.message });
    }
    res.status(201).json({ user: data.user, token: data.session?.access_token });
});

// Login route (for both admin and student)
app.post('/api/auth/:role/login', async (req, res) => {
    const { email, password } = req.body;
    const { role } = req.params;

    // Admin login check
    if (role === 'admin') {
        if (email !== 'admin@exam-portal.com' || password !== '123456') {
            return res.status(401).json({ message: 'Invalid admin credentials' });
        }
        // Optionally, you can skip Supabase for admin or use a hardcoded response:
        return res.json({
            user: { email: 'admin@exam-portal.com', name: 'Admin' },
            token: 'admin-mock-token',
            role: 'admin'
        });
    }

    // Student login via Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    if (error) {
        return res.status(401).json({ message: error.message });
    }
    res.json({ user: data.user, token: data.session.access_token, role });
});

app.post('/api/questions', async (req, res) => {
    const { examTitle, question, options, correct } = req.body;
    if (!examTitle || !question || !options || correct === undefined || correct === null) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const { data, error } = await supabase
        .from('questions')
        .insert([{ exam_title: examTitle, question, options, correct }]);
    if (error) {
        console.log('Supabase error:', error);
        return res.status(500).json({ message: error.message });
    }
    // Fix: Check if data exists and has at least one element
    if (!data || !data[0]) {
        return res.status(500).json({ message: 'Insert failed or returned no data.' });
    }
    res.status(201).json({ question: data[0] });
});

app.get('/api/questions/:examTitle', async (req, res) => {
    const { examTitle } = req.params;
    const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('exam_title', examTitle);
    
    if (error) {
        return res.status(400).json({ message: error.message });
    }

    // Ensure data is properly structured
    if (!data || data.length === 0) {
        return res.status(404).json({ message: 'No questions found for this exam' });
    }

    res.json({ questions: data }); // ✅ Fix: return `data` directly instead of `grouped`
});


app.get('/api/questions/all', async (req, res) => {
    const { data, error } = await supabase.from('questions').select();
    
    console.log('Supabase data:', data, 'error:', error);

    if (error) {
        console.error('Supabase Query Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ message: 'No questions found' });
    }

    // Group questions by exam_title
    const grouped = {};
    data.forEach(q => {
        if (!grouped[q.exam_title]) grouped[q.exam_title] = [];
        grouped[q.exam_title].push(q);
    });

    res.json({ questions: grouped });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// console.log('SUPABASE_URLy:', process.env.SUPABASE_URL);
// console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'Loaded' : 'Missing');