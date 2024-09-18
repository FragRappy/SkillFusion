import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Alert, Typography, Stack, CssBaseline, Link, Grid, Container } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../Header';
import Footer from '../Footer';
import EyeIconButton from '../../EyeIconButton/index.js';
import './index.css';

const Register = () => {
    const [mode, setMode] = useState(localStorage.getItem('theme-color') || 'light');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [usernameMsg, setUsernameMsg] = useState(null)
    const [emailMsg, setEmailMsg] = useState(null);
    const [passwordMsg, setPasswordMsg] = useState(null);
    const [confirmPasswordMsg, setConfirmPasswordMsg] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setUsernameError(false)
            setEmailError(false)
            setPasswordError(false)
            setConfirmPasswordError(false)
            setUsernameMsg(null)
            setEmailMsg(null)
            setPasswordMsg(null)
            setConfirmPasswordMsg(null)
            setLoading(true);

            if (password !== confirmPassword) {
                setConfirmPasswordError(true);
                setConfirmPasswordMsg('Erreur : Le mot de passe et la confirmation doivent être identiques');
            } else {
                setConfirmPasswordError(false);
                const response = await fetch('http://fragrappy-server.eddi.cloud:8080/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password
                    })
                });

                const { status, message, error } = await response.json();

                if (status === 'Succès') {
                    setSuccess(true);
                    setTimeout(() => {
                        navigate('/connexion');
                        setSuccess(null);
                    }, 5000);
                } else {
                    setError(message);
                    setTimeout(() => {
                        setError(null);
                    }, 5000);
                }
                if (error && error.errUsername.length > 0) {
                    setUsernameError(true);
                    error.errUsername.map((error) => setUsernameMsg(error));
                }
                if (error && error.errEmail.length > 0) {
                    setEmailError(true);
                    error.errEmail.map((error) => setEmailMsg(error));
                }
                if (error && error.errPassword.length > 0) {
                    setPasswordError(true);
                    error.errPassword.map((error) => setPasswordMsg(error));
                }
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const theme = createTheme({
        palette: {
            mode: mode
        },
    });

    const toggleColorMode = () => {
        setMode(prev => prev === 'light' ? 'dark' : 'light');
    };

    const handleTogglePasswordVisibility = (champ) => {
        if (champ === 'password') {
            setShowPassword((prev) => !prev);
        } else if (champ === 'confirmPassword') {
            setShowConfirmPassword((prev) => !prev);
        }
        
        
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Header mode={mode} toggleColorMode={toggleColorMode} />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        pt: { xs: 14 },
                        pb: { xs: 8 },
                    }}
                >
                    {error && <Alert severity="error">{error}</Alert>}
                    {success ?
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <div className="success-animation">
                                <svg
                                    className="checkmark"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 52 52">
                                    <circle
                                        className="checkmark__circle"
                                        cx="26"
                                        cy="26"
                                        r="25"
                                        fill="none"
                                    /><path
                                        className="checkmark__check"
                                        fill="none"
                                        d="M14.1 27.2l7.1 7.2 16.7-16.8"
                                    />
                                </svg>
                            </div>
                            <Alert severity="success">Votre inscription a bien été prise en compte</Alert>
                            <Typography>Vous allez être redirigé vers la page de connexion</Typography>
                        </Stack>
                        : <>
                            <Typography component="h1" variant="h5">
                                Inscription
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={usernameError}
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="username"
                                            label="Nom d'utilisateur"
                                            type="text"
                                            id="username"
                                            value={username}
                                            helperText={usernameMsg}
                                            onChange={e => setUsername(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={emailError}
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Adresse Email"
                                            name="email"
                                            value={email}
                                            helperText={emailMsg}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            error={passwordError}
                                            margin="normal"
                                            required
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
                                                        onClick={() => handleTogglePasswordVisibility('password')}
                                                    />
                                                ),
                                            }}

                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            error={confirmPasswordError}
                                            margin="normal"
                                            required
                                            id="confirm-password"
                                            label="Confirmation du mot de passe"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            helperText={confirmPasswordMsg}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            InputProps={{
                                                endAdornment: (
                                                    <EyeIconButton
                                                        showPassword={showConfirmPassword}
                                                        onClick={() => handleTogglePasswordVisibility('confirmPassword')}
                                                    />
                                                ),
                                            }}

                                        />

                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    S'inscrire
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item >
                                        <Link href="/connexion" variant="body2">
                                            Vous avez déjà un compte ? Connectez vous
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </>}
                </Box>
            </Container>
            <Footer />
        </ThemeProvider>
    )
};

export default Register;