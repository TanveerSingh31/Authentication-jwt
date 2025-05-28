import React, { useState } from 'react';
import LoadingPage from '../components/Loading.jsx';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CustomAlert from '../components/CustomAlert.jsx';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const LoginForm = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ''
    });

    const setInfo = (e) => {
        const { value, name } = e.target;
        setUserInfo((prevValue) => ({
            ...prevValue,
            [name]: value
        }));
    };

    const signIn = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await props.login(userInfo);
        if (response?.response?.data?.error) {
            setMessage({ error: true, alertMessage: response.response.data.message });
        }
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && <LoadingPage />}
            {!isLoading && (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                    sx={{
                        backgroundImage: `url('https://source.unsplash.com/random/1920x1080?abstract')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        padding: 2,
                    }}
                >
                    <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400 }}>
                        <Typography variant="h5" align="center" gutterBottom>
                            Login
                        </Typography>

                        {message && <CustomAlert alertMessage={message} />}

                        <Box component="form" onSubmit={signIn} sx={{ mt: 2 }}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                margin="normal"
                                onChange={setInfo}
                                required
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type="password"
                                margin="normal"
                                onChange={setInfo}
                                required
                            />
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                            >
                                Login
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            )}
        </>
    );
};

export default LoginForm;
