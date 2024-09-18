import { useState, useEffect } from 'react';
import { Link,  useLocation } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import ToggleColorMode from '../ToggleColorMode';
import MenuItem from '@mui/material/MenuItem';
import Logout from '../Logout'
import Logo from '../../../../public/images/icon.svg'

const logoStyle = {
    width: '140px',
    height: 'auto',
    cursor: 'pointer',
};

const Header = ({mode, toggleColorMode}) => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null)
    const [open, setOpen] = useState(false);

    const getUser = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://fragrappy-server.eddi.cloud:8080/users`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, 
                }
            });
            const { data, status, message, token} = await response.json();
    
            if(status === "Succès" && token === 'valide') {
              
                setUser(data);
                setRole(data.role)
            } else {
                setRole(null)
            }
        } catch(error) {
            setError(error.message);
        } finally {
            setLoading(false);
        };
    };

    useEffect(()=>{
        getUser();
    }, []);
    
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <div>
            <AppBar position="fixed" sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', mt: 2}}>
                <Container maxWidth="lg">
                    <Toolbar
                        variant="regular"
                        sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            borderRadius: '999px',
                            bgcolor:
                                theme.palette.mode === 'light'
                                ? 'rgba(255, 255, 255, 0.4)'
                                : 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(24px)',
                            maxHeight: 40,
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow:
                                theme.palette.mode === 'light'
                                ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                        })}
                    >
                        <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'center', ml: '-18px', px: 0}}>
                            <Link to='/' style={{lineHeight: 0, fontSize: 'initial' }}>
                                <img
                                    src={Logo}
                                    style={logoStyle}
                                    alt="logo de skillfusion"
                                />
                            </Link>
                            <Box sx={{ display: { xs: 'none', md: 'flex'} }}>
                                <MenuItem to='/' component={Link} state={{ user: user }} sx={{ py: '6px', px: '12px' }}>
                                    <Typography variant="body2" color="text.primary">
                                        Accueil
                                    </Typography>     
                                </MenuItem>
                                <MenuItem to='/cours' component={Link} state={{ user: user }} sx={{ py: '6px', px: '12px' }}>
                                    <Typography variant="body2" color="text.primary">
                                        Cours
                                    </Typography>     
                                </MenuItem>
                            </Box>
                        </Box>
                        <Box sx={{display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center'}}>
                            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode}  />
                            {role === 'admin' || role === 'instructor' ? 
                                <>
                                    <Button color="primary" variant="text" size="small" to='/compte' component={Link} state={{ user: user }}>
                                        Compte
                                    </Button>
                                    <Button color="primary" variant="text" size="small" to='/administration' component={Link} state={{ user: user }}>
                                        Admin
                                    </Button>
                                    <Logout />
                                </> : role === 'member' ? 
                                <>
                                    <Button color="primary" variant="text" size="small" to='/compte' component={Link} state={{ user: user }}>
                                        Compte
                                    </Button>
                                    <Logout />
                                </> : <>
                                    <Button color="primary" variant="text" size="small" to='/connexion' component={Link}>
                                        Connexion
                                    </Button>
                                    <Button color="primary" variant="contained" size="small" to='/inscription' component={Link}>
                                        Inscription
                                    </Button>
                                </>
                            }
                        </Box>
                        <Box sx={{ display: { sm: '', md: 'none' } }}>
                            <Button variant="text" color="primary" aria-label="menu" onClick={toggleDrawer(true)} sx={{ minWidth: '30px', p: '4px' }}>
                                <MenuIcon />
                            </Button>
                            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                                <Box sx={{minWidth: '60dvw', p: 2, backgroundColor: 'background.paper', flexGrow: 1}}>
                                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'end', flexGrow: 1}}>
                                        <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                                    </Box>
                                    <MenuItem to='/cours' component={Link}>
                                        Cours
                                    </MenuItem>
                                    <Divider />
                                    {role === 'admin' || role === 'instructor' ? 
                                        <>
                                            <MenuItem to='/compte' component={Link} state={{ user: user }} sx={{ width: '100%' }}>
                                                Compte
                                            </MenuItem> 
                                            <MenuItem to='/administration' component={Link} state={{ user: user }} sx={{ width: '100%' }}>
                                                Admin
                                            </MenuItem>
                                            <Divider />
                                            <Box sx={{display: 'flex', gap: 1}}>
                                                <Logout />
                                            </Box>
                                        </> : role === 'member' ? 
                                        <>
                                            <MenuItem to='/compte' component={Link} state={{ user: user }} sx={{ width: '100%' }}>
                                                Compte
                                            </MenuItem>
                                            <Divider />
                                            <Box sx={{display: 'flex', gap: 1}}>
                                                <Logout />
                                            </Box>
                                        </> : <>
                                            <MenuItem to='/connexion' component={Link} sx={{ width: '100%' }}>
                                                Connexion
                                            </MenuItem>
                                            <MenuItem to='/inscription' component={Link} sx={{ width: '100%' }}>
                                                Inscription
                                            </MenuItem>
                                        </>
                                    }
                                </Box>
                            </Drawer>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};

export default Header;