import React, { useState } from 'react';
import { FormControl, Card, CardHeader, CardContent, Input, InputLabel, Button } from '@mui/material';
import './Login.css'
import { Snackbar, Alert } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setError] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    const validateForm = () => {
        let errors = {};

        if (!email) {
            errors.email = 'Email is required';
        }
        else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }

        if (!password) {
            errors.password = 'Password is required';
        }
        else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        setError(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            console.log('Email:', email);
            console.log('Password:', password);
            // Proceed with authentication
        } else {
            setOpenSnackbar(true);
            setTimeout(() => {
                setOpenSnackbar(false);
            }, 3000);
            return;
        }
    }

    return (
        <div className='container'>
            <div className='login-card'>
                <Card>
                    <h2 className="login-title">Login</h2>
                    <CardContent className='login-card-body'>
                        <form
                            onSubmit={handleSubmit}
                            className='login-form'
                        >
                            <FormControl>
                                <InputLabel className='email-header'>Enter the Email</InputLabel>
                                <Input
                                    type='text'
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
                                <Button className='login-btn' variant='contained' color='primary'
                                    onClick={handleSubmit}
                                >
                                    Login
                                </Button>
                            </FormControl>
                        </form>
                    </CardContent>
                    <CardHeader
                        className='login-card-footer'
                        title="Don't have an account?"
                        action={
                            <Button
                                variant='text'
                                color='primary'
                                href='/signup'
                            >
                                Sign Up
                            </Button>
                        }
                    >
                    </CardHeader>
                </Card>
            </div>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    Please fill all required fields correctly!
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Login;