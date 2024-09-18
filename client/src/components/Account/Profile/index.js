import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Grid}from "@mui/material";
import Alert from '@mui/material/Alert';
import byebye from '../../../../public/images/waving-heart-goodbye.gif';

const Profile = ({user, setUpdate}) => {
    const {id, username, email, role, createdAt} = user;

    const navigate = useNavigate()
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorUpdate, setErrorUpdate] = useState(null);
    const [errorDelete, setErrorDelete] = useState(null);
    const [successUpdate, setSuccessUpdate] = useState(null);
    const [successDelete, setSuccessDelete] = useState(null);
    const [updateUser, setUpdateUser] = useState(false);
    const [deleteUser, setDeleteUser] = useState(false)
    const [usernameForm, setUsernameForm] = useState('')
    const [emailForm, setEmailForm] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [usernameMsg, setUsernameMsg] = useState(null)
    const [emailMsg, setEmailMsg] = useState(null);

    const handleClickUpdate = () => {
        setUpdateUser(true)
    }

    const handleCancelUpdate = () => {
        setUpdateUser(false); 
    };

    const handleClickDelete = () => {
        setDeleteUser(true)
    }

    const handleCancelDelete = () => {
        setDeleteUser(false); 
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`http://fragrappy-server.eddi.cloud:8080/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, 
                }
            });

            const {status, message} = await response.json()

            if(status === 'Succès') {
                localStorage.removeItem('token');
                setSuccessDelete(message)
                setTimeout(() => {
                    setSuccessDelete(null)
                    navigate('/');
                }, 4000)
            } else {
                setErrorDelete(message)
                setTimeout(() => {
                    setErrorDelete(null)
                }, 4000)
            }
        } catch(error) {
            setError(error);
        } finally {
            setLoading(false);
        };
    }

    const handleUpdate = async (e) => {
       e.preventDefault();
        try {
            setUsernameError(false);
            setEmailError(false);
            setUsernameMsg(null);
            setEmailMsg(null);
            const response = await fetch(`http://fragrappy-server.eddi.cloud:8080/users`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }, 
                body: JSON.stringify({
                    email : emailForm,
                    username : usernameForm
                    
                })
            });

            const {status, message, error} = await response.json()
            if(status === 'Succès') {
                setSuccessUpdate(message)
                setTimeout(() => {
                    setSuccessUpdate(null)
                }, 4000)
                setUpdateUser(false)
                setUpdate({})
            } else {
                setErrorUpdate(message)
                setTimeout(() => {
                    setErrorUpdate(null)
                }, 4000)
            }
            if (error && error.errUsername.length > 0) {
                setUsernameError(true)
                error.errUsername.map((error) => setUsernameMsg(error))
            };
            if (error && error.errEmail.length > 0) {
                setEmailError(true)
                error.errEmail.map((error) => setEmailMsg(error))
            }
        } catch(error) {
            setError(error.message);
        }
    }
    
    return (
        <Container component="main" maxWidth="lg">
            <Box> 
            {error && <Typography>{error.message}</Typography>}
            {successUpdate && <Alert severity="success">{successUpdate}</Alert>}
                {updateUser || deleteUser ? updateUser ?
                   <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box component="form" noValidate onSubmit={handleUpdate} >
                        {errorUpdate && <Alert severity="error">{errorUpdate}</Alert>}
                            <TextField
                                variant="standard"
                                error={usernameError}
                                margin="normal"
                                fullWidth
                                name="username"
                                label="Nouveau nom d'utilisateur"
                                type="text"
                                id="username"
                                size="small"
                                value={usernameForm}
                                helperText={usernameMsg}
                                onChange={(e) => setUsernameForm(e.target.value)}
                            />
                            <TextField
                                variant="standard"
                                error={emailError}
                                margin="normal"
                                fullWidth
                                id="email"
                                size="small"
                                label="Nouvelle adresse email"
                                name="email"
                                helperText={emailMsg}
                                value={emailForm}
                                onChange={(e) => setEmailForm(e.target.value)}
                            />
                            <Grid container spacing={2} justifyContent={"center"} sx={{ mt: 3}}>
                                <Grid item>
                                    <Button type="cancel" size="small" color="secondary" fullWidth variant="contained" onClick={handleCancelUpdate}>
                                        Annuler
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button type="submit" size="small" color="primary" fullWidth variant="contained">
                                        Valider
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                   </Box> : 
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={byebye} alt="représentation d'un coeur qui dit aurevoir de la main" style={{width: '100px'}}/>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
                            {errorDelete && <Alert severity="error">{errorDelete}</Alert>}
                            {successDelete && <Alert severity="success">{successDelete}</Alert>}
                            <Typography variant="body2">Nous sommes navré de vous voir partir.</Typography>
                            <Typography variant="body2">N'hésitez pas à revenir nous voir si vous avez de nouveaux projets (travaux, déco et plus encore...)</Typography>
                                <Box sx={{display: { xs: 'flex'}, gap: 1, alignItems: 'center', justifyContent: 'center', mt: 3}}>
                                    <Button color="secondary" variant="contained" size="small" onClick={handleCancelDelete}>Annuler</Button>
                                    <Button color="primary" variant="contained" size="small" value={id} onClick={(e) => handleDelete(e.target.value)}>Supprimer</Button>
                                </Box>
                        </Box>
                    </Box> :
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2">Votre pseudo : {username}</Typography>
                        <Typography variant="body2">Votre email : {email}</Typography>
                        <Typography variant="body2">Status : {role}</Typography>
                        <Typography variant="body2">Date d'inscription: {createdAt}</Typography>
                        <Box sx={{display: { xs: 'flex'}, gap: 1, alignItems: 'center', justifyContent: 'center', mt: 3}}>
                            <Button color="primary" variant="contained" size="small" onClick={handleClickUpdate}>Modifier</Button>
                            <Button color="secondary" variant="contained" size="small" onClick={handleClickDelete}>Supprimer le compte</Button>
                        </Box>
                    </Box>
                }
            </ Box>
        </Container>
    );
};

export default Profile;