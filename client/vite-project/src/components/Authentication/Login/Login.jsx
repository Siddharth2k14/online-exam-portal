import React, { useState } from 'react';
import { FormControl, Card, CardHeader, CardContent, Input, InputLabel, Button } from '@mui/material';
import './Login.css'
import { Snackbar, Alert } from '@mui/material';

const Login = ({ name }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { loading, error } = useSelector(state => state.auth);

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
        const newErrors = {};

        if (!email) {
            newErrors.email = 'Email is required';
        }
        else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        }
        else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(loginStart());
            try {
                // Replace with your API call
                const userData = { email };
                dispatch(loginSuccess(userData));
            } catch (err) {
                dispatch(loginFailure('Invalid credentials'));
            };
        };
    };

    return (
        <div className='container'>
            <div className='login-card'>
                <Card>
                    <h2 className="login-title">Login for {name}</h2>
                    <CardContent className='login-card-body'>
                        <form
                            onSubmit={handleLogin}
                            className='login-form'
                        >
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
                                <Button className='login-btn' variant='contained' color='primary'
                                    type='submit' disabled={loading}
                                >
                                    Login
                                </Button>
                            </FormControl>
                        </form>
                    </CardContent>

                    {name === 'student' && (
                        <div>
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

                            <CardHeader
                                className='login-card-footer'
                                title="Forgot Password?"
                                action={
                                    <Button
                                        variant='text'
                                        color='primary'
                                        href='/forgetPassword'
                                    >
                                        Reset Password
                                    </Button>
                                }
                            />
                        </div>
                    )}
                </Card>
            </div>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    {errors.api || "Please fill all required fields correctly!"}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Login;