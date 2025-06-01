const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = 3000;

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
);

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})