import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Button, Alert, CssBaseline, Typography, Chip, Divider, Rating, TextField,  } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../../App/Header';
import Footer from '../../App/Footer';
import Step from './Step';
import Comment from './Comment';
import Video from './Video';

const Detail = () => {
    const { lesson_id } = useParams();
    const [mode, setMode] = useState(localStorage.getItem('theme-color') || 'light');
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [lesson, setLesson] = useState({});
    const [error, setError] = useState({ follow: null, rate: null, lesson: null });
    const [success, setSuccess] = useState({ follow: null, rate: null, lesson: null });
    const [access, setAccess] = useState({follow: false, lesson: false});
    const [userRate, setUserRate] = useState(1);
    const [inputComment, setInputComment] = useState('');
    const [formComment, setFormComment] = useState(false);
    const [update, setUpdate] = useState({})
    
    const getLesson = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://fragrappy-server.eddi.cloud:8080/lessons/${lesson_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            
            const { data, status, message, token } = await response.json();
            if (status === 'Succès' && token === 'valide') {
                setLesson(data);
                setAccess(access => ({...access, lesson: true}));
            } else {
                setError({...error, lesson: message});
            };
        } catch (error) {
            setError(`Le serveur ne répond pas : ${error.lesson}`);
        } finally {
            setLoading(false);
        };
    };

    const handleAddComment = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://fragrappy-server.eddi.cloud:8080/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    data:{content:inputComment, lesson_id: lesson_id},
                })
            });
            const { status} = await response.json();
          
            if (status === 'Succès') {
                setInputComment('')
                setFormComment(false);
                setUpdate({});
            }
        } catch (error) {
            setError(`Le serveur ne répond pas : ${error.follow}`);
        } finally {
            setLoading(false);
        };
    };
 
    const getFollow = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://fragrappy-server.eddi.cloud:8080/users/follow`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            
            const { data, status, message, token} = await response.json();
            if (status === 'Succès' && token === 'valide') {
                data.map((follow) => {
                    if (follow.id == lesson_id){
                        setAccess(access => ({...access, follow: true}));
                    };
                });
            } else {
                setError({...error, follow: message});
            };
        } catch (error) {
            setError(`Le serveur ne répond pas : ${error.follow}`);
        }  finally {
            setLoading(false);
        };
    };

    const handleAddFollow = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://fragrappy-server.eddi.cloud:8080/users/follow/${lesson_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const { status, message} = await response.json();
            if (status === 'Succès') {
                setAccess({...access, follow: true});
                setSuccess({...success, follow: message})
                const showAlert = setTimeout(() => {
                    setSuccess({...success, follow: null});
                    clearTimeout(showAlert)
                }, 3000)
            } else {
                setError({...error, follow: message});
                const showAlert = setTimeout(() => {
                    setError({...error, follow: null});
                    clearTimeout(showAlert)
                }, 3000)
            };
        } catch (error) {
            setError(`Le serveur ne répond pas : ${error.follow}`);
        } finally {
            setLoading(false);
        };
    };

    const handleDeleteFollow = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://fragrappy-server.eddi.cloud:8080/users/unfollow/${lesson_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const { status, message} = await response.json();
            if (status === 'Succès') {
                setAccess({...access, follow: false});
                setSuccess({...success, follow: message});
                const showAlert = setTimeout(() => {
                    setSuccess({...success, follow: null});
                    clearTimeout(showAlert)
                }, 3000)
            } else {
                setError({...error, follow: message});
                const showAlert = setTimeout(() => {
                    setError({...error, follow: null});
                    clearTimeout(showAlert)
                }, 3000)
            };
        } catch (error) {
            setError(`Le serveur ne répond pas : ${error.follow}`);
        } finally {
            setLoading(false);
        };
    };

    const handleRating = async (newRate) => {
        setUserRate(newRate)
        setLoading(true);
        try {
            const response = await fetch(`http://fragrappy-server.eddi.cloud:8080/rates/${lesson_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    rate: newRate,
                })
            });
            const { status, message, token} = await response.json();
            if (status === 'Succès' && token === 'valide') {
                setSuccess({...success, rate: message})
                const showAlert = setTimeout(() => {
                    setSuccess({...success, rate: null})
                    clearTimeout(showAlert)
                }, 3000)
            } else {
                setError({...error, rate: message});
            };
        } catch (error) {
            setError(`Le serveur ne répond pas : ${error.rate}`);
        } finally {
            setLoading(false);
        };
    }

    const handleNextStep = () => {
        if (currentStep < lesson.Steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleFormComment = () => {
        setFormComment(true)
    };

    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
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
        getLesson();
        getFollow(); 
    }, [success.follow, success.rate, update]);
   
    console.log(lesson)
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
                    { access.lesson && lesson 
                    ?
                        <Box>
                            <Typography textAlign={'center'} component={'h1'} variant='h1' sx={{mb: '2rem', fontSize: {xs: '2rem', sm:'3rem'}}}>{lesson.title}</Typography>
                            <Box sx={{display: 'flex', justifyContent:{sm: 'space-evenly'}, gap: 2, flexWrap: {xs: 'wrap', sm: 'nowrap'}, pb:2}}>
                                <Box sx={{width: {xs: '100%', sm:'70%'}}}>
                                    <img style={{width: '100%'}} src={lesson && lesson.image} alt="image d'illustration du cours" />
                                </Box>
                                <Box sx={{display: {xs: 'none', sm:'flex'}}}>
                                    <Divider orientation="vertical" variant="middle" flexItem />
                                </Box>
                                <Box sx={{margin: {xs:'auto', sm:'auto'}}}>
                                    {access.follow ? 
                                                <>
                                                    {success.follow && <Alert severity='success'>{success.follow}</Alert>}
                                                    {error.follow && <Alert severity='error'>{error.follow}</Alert>}
                                                    <Button sx={{width: '100%'}} variant='contained' onClick={handleDeleteFollow} >Ne plus suivre</Button>
                                                </> :
                                                <> 
                                                    {success.follow && <Alert severity='success'>{success.follow}</Alert>}
                                                    {error.follow && <Alert severity='error'>{error.follow}</Alert>} 
                                                    <Button sx={{width: '100%'}} variant='contained' onClick={handleAddFollow} >Suivre ce cours</Button>
                                                </>
                                    }
                                    <Divider flexItem style={{marginTop: '1rem'}} />
                                    <Typography sx={{mt: 2}}>Catégorie :</Typography>
                                    {lesson && lesson.Categories.map(category => <Chip key={category.name} sx={{width: '100%' , mt: 1}} label={`${category.name}`} variant="outlined" />)}
                                    <Divider flexItem style={{marginTop: '1rem', marginBottom: '1rem'}} />
                                    <Typography variant='body'>Auteur : {lesson.author}</Typography>
                                    <Divider flexItem style={{marginTop: '1rem', marginBottom: '1rem'}} />
                                    <Typography sx={{mb:1}} variant='body2' >Notez la qualité de ce cours</Typography>
                                    {success.rate && <Alert severity='success'>{success.rate}</Alert>}
                                    {error.rate && <Alert severity='error'>{error.rate}</Alert>}
                                    <Rating name="notes" defaultValue={0} value={parseInt(lesson.rate)}  onChange={(event, newValue) => {handleRating(newValue)}} size='large'/>
                                </Box>
                            </Box>
                            <Divider style={{marginTop: '1rem', marginBottom: '2rem'}}/>
                            <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, gap:{xs: '2rem'}}}>
                                <Box>
                                    <Typography textAlign={'center'} component={'h2'} variant='h2' sx={{mb: '2rem', fontSize: {xs: '1rem', sm:'2rem'}}}>Description :</Typography>
                                    <Typography component={'p'} variant='body1' >{lesson.description}</Typography>
                                </Box>
                                <Divider orientation="vertical" variant="middle" flexItem />
                                <Box textAlign={'center'}>
                                    <Video link={lesson && lesson.video.includes('be/') ? lesson.video.split('be/')[1] : lesson.video.split('v=')[1]} />
                                </Box>
                            </Box>
                            <Divider style={{marginTop: '2rem', marginBottom: '2rem'}} />
                            <Box>
                            {lesson.Steps && lesson.Steps.length > 0 
                                ? lesson.Steps.map((step, index) => {
                                    if (index === currentStep) {
                                        return (
                                            <Box key={step.id}>
                                                <Typography component='h3' variant='h5'>Etape {currentStep + 1}</Typography>
                                                <Step step={step} index={index} />
                                                <Box sx={{display: 'flex', justifyContent:'space-between'}}>
                                                    <Button variant='contained' color='secondary' onClick={handlePrevStep} disabled={currentStep === 0}>Etape précédente</Button>
                                                    <Button variant='contained' color='primary' onClick={handleNextStep} disabled={!lesson.Steps || currentStep === lesson.Steps.length - 1 || lesson.Steps.length === 0}>
                                                        Etape suivante
                                                    </Button>
                                                </Box>
                                            </Box>
                                        );
                                    } else {
                                        return;
                                    }
                                }) :
                                <p>Aucune étape n'est actuellement disponible</p>
                            }
                            </Box>
                            <Divider style={{marginTop: '2rem', marginBottom: '2rem'}} />
                            <Box>
                                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Typography component='p' variant='h6' sx={{mb: 3}}>Espace commentaires {`(${lesson.nb_comments})`}</Typography>
                                    <Button sx={{mb: 3}} variant='contained' onClick={handleFormComment}>Ajouter un commentaire</Button>
                                </Box>
                                <Box sx={{border: '2px solid white', minHeight: '200px', borderRadius: '6px'}}>
                                    {formComment 
                                        &&  <Box component='form' onSubmit={handleAddComment}>
                                                <TextField
                                                    variant="standard"
                                                    multiline
                                                    rows={1}
                                                    inputProps={{ maxRows:3, maxLength: 256 }}
                                                    placeholder="Caractères maximum : 256"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    name="step"
                                                    label="commentaire"
                                                    type="text"
                                                    value={inputComment}
                                                    id="comment"
                                                    onChange={e => setInputComment(e.target.value)}
                                                />
                                                <Button type='submit' sx={{float: 'right'}} disabled><SendIcon />Envoyer</Button>
                                            </Box> 
                                    }
                                    {lesson.Comments && lesson.Comments.slice(0,10).map((comment) => <Comment key={comment.id} comment={comment} />)}
                                </Box>
                            </Box>
                        </Box>
                       
                    :   <Box>
                            <Typography>Vous devez être connecté pour accéder à cette page</Typography>
                            <Button href='/connexion' variant='contained'>Se connecter</Button>
                        </Box>
                    }
                </Box>
                <Footer />
            </Container>
        </ThemeProvider>
    );
};

export default Detail;