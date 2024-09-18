import { useState } from 'react';
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Header from '../App/Header';
import Footer from "../App/Footer";
import imgError from '../../../public/images/404.svg';

const Error = () => {
    const [mode, setMode] = useState(localStorage.getItem('theme-color') || 'light');

    const theme = createTheme({
        palette: {
          mode: mode
        },
    })

    const toggleColorMode = () => {
        setMode(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeProvider theme={theme} >
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Header mode={mode} toggleColorMode={toggleColorMode}/>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: { xs: 14, sm: 20 },
                    pb: { xs: 8, sm: 12 },
                    }}
                >
                    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2}}>
                        <img style={{width: '100%', maxWidth: '550px', height: 'auto'}} src={imgError} alt="Image 404 d'une page non trouvé" />
                        <Button color="primary" variant="contained" component={Link} to='/' >Retourner à l'accueil</Button>  
                    </Box>
                </Box>
                </Container>
            <Footer />
        </ThemeProvider>
    );
};

export default Error;