import React, { useEffect, useState } from "react";
import { CircularProgress, Box, Container, CssBaseline, Table, TablePagination, TableFooter, TableRow, IconButton, Paper, TableContainer, Typography, Link } from "@mui/material";
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Header from "../App/Header";
import Footer from "../App/Footer";
import Search from "./Search";
import Card from "./Card";


function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="première page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="page précedente"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="page suivante"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="dernière page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

const Lessons = () => {
    const [mode, setMode] = useState(localStorage.getItem('theme-color') || 'light');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [access, setAccess] = useState(false);
    const [sortedLessons, setSortedLessons] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [accessUser, setAccessUser]= useState(false)

    const getLessons = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://fragrappy-server.eddi.cloud:8080/lessons/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const { data, status, message } = await response.json();
            if (status === 'Succès') {
                setAccess(true);
                setLessons(data);
                setSortedLessons(data)
                setTotalPages(Math.ceil(data.length / perPage));
            } else {
                setError(message);
            };
        } catch (error) {
            setError(`Le serveur ne répond pas : ${error.message}`);
        } finally {
            setLoading(false);
        };
    };

    const getUser = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://fragrappy-server.eddi.cloud:8080/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, 
                }
            });
            const { data, status, message } = await response.json();
         
            if(status === "Succès") {
                setAccessUser(true)
            } else {
                setAccessUser(false)
                setError(message);
            }
        } catch(error) {
            setError(error.message);
        } finally {
            setLoading(false);
        };
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const theme = createTheme({
        palette: {
            mode: mode
        },
    })

    const toggleColorMode = () => {
        setMode(prev => prev === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        getUser()
        getLessons();
    }, []);

    return (
        <ThemeProvider theme={theme} >
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Header mode={mode} toggleColorMode={toggleColorMode} />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        pt: { xs: 14, sm: 20 },
                        pb: { xs: 8, sm: 12 },
                    }}
                >
                    {loading 
                        ?   <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                        :   
                            <Box>
                                <Typography component='h2' variant="h2" sx={{display: 'flex', justifyContent: 'center', fontSize: {xs: '2rem', sm:'3rem'}}}>Les cours disponibles</Typography>
                                <Box sx={{display: "flex", flexWrap: 'wrap', justifyContent: 'center'}}>
                                    {accessUser 
                                        ?
                                            <>
                                                <Search setSortedLessons={setSortedLessons} lessons={lessons}/>
                                                {(rowsPerPage > 0 ? sortedLessons.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage): sortedLessons).map(lesson => <Card key={lesson.id} lesson={lesson} access={access} />)}
                                            </>
                                        :   <Box sx={{display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                                <p>Vous devez être connecté pour accéder à cette page</p>
                                                <Link href="/connexion" >Se connecter</Link>
                                            </Box>
                                    } 
                                </Box>
                                <Box component={'table'} sx={{mt:6, width: '100%', display: 'flex', justifyContent: 'center'}}>
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                labelRowsPerPage= 'Cours:'
                                                rowsPerPageOptions={[6, 12, 24, { label: 'Tout', value: -1 }]}
                                                count={lessons.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                slotProps={{
                                                    select: {
                                                        inputProps: {
                                                            'aria-label': 'Cours par page',
                                                        },
                                                        native: true,
                                                    },
                                                }}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                                ActionsComponent={TablePaginationActions}
                                            />
                                        </TableRow>
                                    </TableFooter>
                                </Box>
                            </Box>
                    }
                    
                </Box>
            </Container>
            <Footer />
        </ThemeProvider>
    );
};

export default Lessons;