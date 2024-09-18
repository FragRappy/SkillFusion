import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../Header';
import Footer from '../Footer';
import EyeIconButton from '../../EyeIconButton/index.js'; // Assurez-vous que le chemin est correct

const Login = () => {
    const [mode, setMode] = useState(localStorage.getItem('theme-color') || 'light');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [emailMsg, setEmailMsg] = useState([])
    const [passwordMsg, setPasswordMsg] = useState([])

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setEmailError(false)
            setPasswordError(false)
            setEmailMsg([])
            setPasswordMsg([])
            setLoading(true)
            const response = await fetch('http://fragrappy-server.eddi.cloud:8080/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const { data, status, message, error } = await response.json();

            if (status === 'Succès') {
                localStorage.setItem("token", data.token);
                navigate("/compte");

            } else {
                if (message) {
                    setError(message)
                    setTimeout(() => {
                        setError(null)
                    }, 5000)
                }
                if (error && error.errEmail.length > 0) {
                    setEmailError(true)
                    error.errEmail.map((error) => setEmailMsg(error))
                }
                if (error && error.errPassword.length > 0) {
                    setPasswordError(true)
                    error.errPassword.map((error) => setPasswordMsg(error))
                };
            };
        } catch (error) {
            setError(`Le serveur ne répond pas : ${error}`);
        } finally {
            setLoading(false);
        };
    };

    const theme = createTheme({
        palette: {
            mode: mode
        },
    })

    const toggleColorMode = () => {
        setMode(prev => prev === 'light' ? 'dark' : 'light');
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <ThemeProvider theme={theme} >
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Header mode={mode} toggleColorMode={toggleColorMode}/>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        pt: { xs: 14, sm: 20 },
                        pb: { xs: 8, sm: 12 },
                    }}
                >
                     {error && <Alert severity="error">{error}</Alert>}
                    <Typography component="h1" variant="h5">
                        Connexion
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            error={emailError}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Adresse Email"
                            name="email"
                            autoFocus
                            helperText={emailMsg}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            error={passwordError}
                            required
                            fullWidth
                            name="password"
                            label="Mot de passe"
                            type={showPassword ? 'text' : 'password'} 
                            id="password"
                            value={password}
                            helperText={passwordMsg}
                            onChange={e => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <EyeIconButton
                                        showPassword={showPassword}
                                        onClick={handleTogglePasswordVisibility}
                                    />
                                ),
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Se connecter
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/inscription" variant="body2">
                                    {"Vous n'avez pas de compte ? Inscrivez vous"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            <Footer />
        </ThemeProvider>
    );
};

export default Login;