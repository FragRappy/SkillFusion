import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Header from '../App/Header';
import Footer from '../App/Footer';
import UsersMonitoring from "./UsersMonitoring";
import LessonsMonitoring from "./LessonsMonitoring";
import Error from '../Error'

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            style={{width: '100%'}}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography variant='p'>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Admin = () => {
    const [mode, setMode] = useState(localStorage.getItem('theme-color') || 'light');
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [role, setRole] = useState(null);
    const [user, setUser] = useState(null);

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
                setUser(data.id)
                setRole(data.role)
            } else {
                setError(message);
                setRole(null)
            }
        } catch(error) {
            setError(error.message);
        } finally {
            setLoading(false);
        };
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const theme = createTheme({
        palette: {
          mode: mode
        },
    })

    const toggleColorMode = () => {
        setMode(prev => prev === 'light' ? 'dark' : 'light');
    };

    useEffect(()=>{
        getUser();
    }, []);

    return (
        <ThemeProvider theme={theme} >
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Header mode={mode} toggleColorMode={toggleColorMode}/>
                {loading || role && role === 'admin' || role === 'instructor' ?
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        pt: { xs: 14, sm: 20 },
                        pb: { xs: 8, sm: 12 },
                        }}
                    >
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%'}}>
                            <Tabs centered value={value} onChange={handleChange} aria-label="Menu Administration" >
                                <Tab label="Gestion des cours" {...a11yProps(0)} aria-label="Gestion des cours" />
                                {role === 'admin' && <Tab label="Gestion des utilisateurs" {...a11yProps(1)} aria-label="Gestion des utilisateurs" />}
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0} >
                            <LessonsMonitoring role={role} user={user} />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <UsersMonitoring />
                        </CustomTabPanel>
                    </Box> : 
                    error && <Error />
                }
            </Container>
            <Footer />
        </ThemeProvider>
    );
};

export default Admin;