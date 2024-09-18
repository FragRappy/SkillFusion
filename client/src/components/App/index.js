import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Divider, Typography, Box, CssBaseline, Stack } from "@mui/material";
import Header from "./Header";
import Hero from './Hero';
import LessonCarousel from "../Lessons/Carousel";
import Footer from './Footer';
import background from '../../../public/images/header-bg.svg';
import img1 from '../../../public/images/img1.jpg';
import img2 from '../../../public/images/img2.jpg';
import img3 from '../../../public/images/img3.jpg'

const App = () => {
    const [mode, setMode] = useState(localStorage.getItem('theme-color') || 'light');
    const [loading, setLoading] = useState(false);
    const [mostRated, setMostRated] = useState(null);
    const [mostCommented, setMostCommented] = useState(null);
    const [access, setAccess] = useState(false);
    const [error, setError] = useState(null);
    const [errorRate, setErrorRate] = useState(null);
    
    const getLessonsByRate = async () => {
        try {
            setLoading(true)
            const response = await fetch(`http://fragrappy-server.eddi.cloud:8080/lessons/byrate`);

            const { data, status, message } = await response.json();
            if (status === 'Succès') {
                setMostRated(data);
            } else {
                setErrorRate(message);
            };
        } catch (error) {
            setError(`Le serveur ne répond pas : ${error.message}`);
        } finally {
            setLoading(false);
        };
    };

    const getLessonsByComment = async () => {
        try {
            setLoading(true)
            const response = await fetch(`http://fragrappy-server.eddi.cloud:8080/lessons/bycomment`);

            const { data, status, message } = await response.json();

            if (status === 'Succès') {
                setMostCommented(data);
            } else {
                setErrorComment(message);
            };
        } catch (error) {
            setError(`Le serveur ne répond pas : ${error.message}`);
        } finally {
            setLoading(false);
        };
    };

    const getToken = () => {
        const token = localStorage.getItem('token');
        if (token) {
            setAccess(true);
        } else {
            setAccess(false);
        }
    };

    const theme = createTheme({
        palette: {
          mode: mode,
        },
    });;

    const toggleColorMode = () => {
        setMode(prev => prev === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        getToken();
        getLessonsByRate();
        getLessonsByComment();
    }, []);
    console.log(mostRated)
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header mode={mode} toggleColorMode={toggleColorMode}/>
            <Hero />
            <Divider />
            <Box 
                sx={{ 
                    pt: 6, 
                    pb: 6,
                    position: 'relative', 
                    "::before": {
                        content: `''`,
                        opacity: 0.05,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        display: 'inline-block',
                        position: 'absolute',
                        backgroundImage: `url(${background})`,
                        backgroundSize:'200px',
                        zIndex: '-100',
                    }
                }}
            >
                <Stack spacing={2} sx={{ width: '100%', mb: 3 }}>
                    <Typography
                        component="h2"
                        variant="h2"
                        sx={{
                            fontSize: {xs :'2rem', sm: '3rem'},
                            fontWeight: 400,
                            display: 'flex',
                            alignSelf: 'center',
                            textAlign: 'center',
                        }}
                    >
                            Top&nbsp;
                        <Typography
                            component="span"
                            variant="h2"
                            sx={{
                                fontSize: {xs :'2rem', sm: '3rem'},
                                fontWeight: 400,
                                color: 
                                    theme.palette.mode === 'light' ? 'primary.main' : '#83b8e2',
                            }}
                        >
                            10&nbsp;
                        </Typography>
                        <Typography 
                            component="span"
                            variant="h2"
                            sx={{
                                fontSize: {xs :'2rem', sm: '3rem'},
                                fontWeight: 400,
                                display: 'flex',
                                alignSelf: 'center',
                                textAlign: 'center',
                            }}
                        >
                            des cours notés
                        </Typography>
                    </Typography>
                </Stack>
                {mostRated && <LessonCarousel lessons={mostRated.sort((a,b) => b.rate - a.rate)} access={access} loading={loading} />}
            </Box>
            <Divider />
            <Box sx={{display: "flex", pt: 6, pb: 6, justifyContent: 'center'}}>
                <Box  sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row'},
                        alignItems: 'center',
                        maxWidth: '1500px',
                        minWidth: '400px',
                        gap: 1,
                    }}
                >   
                        <img style={{maxWidth:'500px', width: '100%', maxHeight: '400px', height: 'auto', objectFit: 'cover' }} src={img1} alt="un homme qui tient des planches de bois" />
                        <img style={{maxWidth:'500px', width: '100%', maxHeight: '400px', height: 'auto', objectFit: 'cover' }} src={img3} alt="une femme qui répare un objet" />
                        <img style={{maxWidth:'500px', width: '100%', maxHeight: '400px', height: 'auto', objectFit: 'cover' }} src={img2} alt="un homme qui répare un objet" />
                </Box>
            </Box>
            <Divider />
            <Box 
                sx={{ 
                    pt: 6, 
                    pb: 6,
                    position: 'relative', 
                    "::before": {
                        content: `''`,
                        opacity: 0.05,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        display: 'inline-block',
                        position: 'absolute',
                        backgroundImage: `url(${background})`,
                        backgroundSize:'200px',
                        zIndex: '-100',
                    }
                }}
            >
                <Stack spacing={2} useFlexGap sx={{ width: '100%', mb: 3 }}>
                    <Typography
                        component="h2"
                        variant="h2"
                        sx={{
                            fontSize: {xs :'2rem', sm: '3rem'},
                            fontWeight: 400,
                            display: 'flex',
                            alignSelf: 'center',
                            textAlign: 'center',
                        }}
                    >
                            Top&nbsp;
                        <Typography
                            component="span"
                            variant="h2"
                            sx={{
                                fontSize: {xs :'2rem', sm: '3rem'},
                                fontWeight: 400,
                                color: 
                                    theme.palette.mode === 'light' ? 'primary.main' : '#83b8e2',
                            }}
                        >
                            10&nbsp;
                        </Typography>
                        <Typography 
                            component="span"
                            variant="h2"
                            sx={{
                                fontSize: {xs :'2rem', sm: '3rem'},
                                fontWeight: 400,
                                display: 'flex',
                                alignSelf: 'center',
                                textAlign: 'center',
                            }}
                        >
                            des cours commentés
                        </Typography>
                    </Typography>
                </Stack>
                {mostCommented && <LessonCarousel lessons={mostCommented.sort((a,b) => b.comment - a.comment)} access={access} loading={loading} />}
            </Box>
            <Footer />
        </ThemeProvider>
    );
};

export default App;