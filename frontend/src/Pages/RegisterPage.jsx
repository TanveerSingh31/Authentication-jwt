import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const RegisterForm = (props) => {
    const navigate = useNavigate();

    const [userInfo, setInfo] = useState({
        fName: '',
        lName: '',
        email: '',
        password: ''
    });

    const userInfoChange = (e) => {
        const { name, value } = e.target;
        setInfo((prevValue) => ({
            ...prevValue,
            [name]: value
        }));
    };

    const register = async (e) => {
        e.preventDefault();
        props.register(userInfo);
    };

    return (
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
            <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 500 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Register
                </Typography>

                <Box component="form" onSubmit={register} sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        label="First Name"
                        name="fName"
                        margin="normal"
                        onChange={userInfoChange}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        name="lName"
                        margin="normal"
                        onChange={userInfoChange}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        margin="normal"
                        onChange={userInfoChange}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        margin="normal"
                        onChange={userInfoChange}
                        required
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Register
                    </Button>

                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        Already a member?{' '}
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => navigate('/login')}
                            underline="hover"
                        >
                            Sign In
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default RegisterForm;
