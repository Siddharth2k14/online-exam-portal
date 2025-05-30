import React, { useState } from 'react'
import { FormControl, Card, CardHeader, CardContent, Input, InputLabel, Button } from '@mui/material';
import './Signup.css'
import { Snackbar, Alert } from '@mui/material';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Enter a valid email';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (confirmPassword !== password) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:3000/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password, confirmPassword }),
                });
                const data = await response.json();
                if (response.ok) {
                    // Optionally, redirect to login or auto-login
                    window.location.href = '/student/login'; // Change as needed
                } else {
                    setErrors({ api: data.message || 'Signup failed' });
                    setOpenSnackbar(true);
                }
            } catch (error) {
                setErrors({ api: 'Server error' });
                setOpenSnackbar(true);
            }
        } else {
            setOpenSnackbar(true);
            setTimeout(() => {
                setOpenSnackbar(false);
            }, 3000);
            return;
        }
    };

    return (
        <div className='container'>
            <div className='signup-card'>
                <Card>
                    <h2 className="signup-title">Signup</h2>
                    <CardContent className='signup-card-body'>
                        <form
                            onSubmit={handleSubmit}
                            className='signup-form'
                        >
                            <FormControl>
                                <InputLabel className='name-header'>Enter the Name</InputLabel>
                                <Input
                                    type='text'
                                    placeholder='Name'
                                    className='name-input'
                                    value={name}
                                    onChange={handleNameChange}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel className='email-header'>Enter the Email</InputLabel>
                                <Input
                                    type='email'
                                    placeholder='Email'
                                    className='email-input'
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel className='password-header'>Enter the Password</InputLabel>
                                <Input
                                    type='password'
                                    placeholder='Password'
                                    className='password-input'
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel className='confirm-password-header'>Confirm the Password</InputLabel>
                                <Input
                                    type='password'
                                    placeholder='Confirm Password'
                                    className='confirm-password-input'
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                            </FormControl>
                            <FormControl>
                                <Button className='signup-btn' variant='contained' color='primary'
                                    type='submit'
                                    disabled={!name || !email || !password || !confirmPassword}
                                >
                                    Signup
                                </Button>
                            </FormControl>
                        </form>
                    </CardContent>
                    <CardHeader
                        className='signup-card-footer'
                        title="Already have an account?"
                        action={
                            <Button
                                variant='text'
                                color='primary'
                                href='/student/login'
                            >
                                Log In
                            </Button>
                        }
                    >
                    </CardHeader>
                </Card>
            </div>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    {errors.api || "Please fill all required fields correctly!"}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Signup
