import { useEffect, useState } from "react";
import { TextField, Typography, Box, Button, Alert, Stack, Grid, Select, InputLabel, FormControl, Chip, MenuItem } from "@mui/material";
import './index.css';

const NewLesson = ({user}) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [select, setSelect] = useState('');
    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState(null);
    const [description, setDescription] = useState('');
    const [step, setStep] = useState({})
    const [steps, setSteps] = useState([]);
    const [addStep, setAddStep] = useState(false)
    const [imgLesson, setImgLesson] = useState('');
    const [videoLesson, setVideoLesson] = useState('');

    const addLesson = async (data) => {
        try {
            setLoading(true);
            const response = await fetch(`http://fragrappy-server.eddi.cloud:8080/lessons`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, 
                },
                body: JSON.stringify({
                    data
                }),
            });

            const { status, message } = await response.json();
            if(status === "Succès") {
                setSuccess(message)
                setTimeout(() => {
                    setSelect('');
                    setTitle('');
                    setDescription('');
                    setStep({});
                    setSteps([]);
                    setImgLesson('');
                    setVideoLesson('');
                    setSuccess(null);
                }, 4000)
            }
        } catch(error) {
            setError(error.message);
        } finally {
            setLoading(false);
        };
    }

    const getCategories = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://fragrappy-server.eddi.cloud:8080/categories', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const { data, status, message} = await response.json();

            if (status === 'Succès') {
                setCategories(data);
            } else {
                setError(message);
            };

        } catch (error) {
            setError(`Erreur : ${error.message}`);
        } finally {
            setLoading(false);
        };
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {user_id: user, title, description, category:select, steps, image: imgLesson, video: videoLesson}
        addLesson(data)
    }

    const handleSteps = () => {
        setSteps(steps => [...steps, step] );
        setAddStep(false)
    }
    const handleStep = (e, field) => {
        field === 'content' 
            ? setStep(step => ({...step, content: e.target.value}))
            : setStep(step => ({...step, image: e.target.value}));
    }

    const handleAddStep = () => {
        setAddStep(true)
    }

    const handleCancelStep = () => {
        setAddStep(false)
    }

    const handleSelect = (event) => {
        setSelect(event.target.value);
    };

    useEffect(() => {
        getCategories()
    }, [])
 
    return(
        <Box>
            {error && <Alert severity="error">{error}</Alert>}
            {success ? 
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <div className="success-animation">
                        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                        </svg>
                    </div>
                    <Alert severity="success">Le cours à bien été créé</Alert>
                </Stack> : 
                <>
                    <Typography component="h1" variant="h4">
                        Ajouter un cours
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    variant="standard"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="title"
                                    label="Titre du cours"
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="select-addlesson">Catégorie</InputLabel>
                                    <Select
                                        labelId="select-addlesson"
                                        id="select-addlesson"
                                        value={select}
                                        label="Categorie du cours"
                                        onChange={handleSelect}
                                    >
                                        {categories && categories.map((category) => <MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="standard"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="img-lesson"
                                    label="url de l'image du cours"
                                    type="text"
                                    id="img-lesson"
                                    value={imgLesson}
                                    onChange={e => setImgLesson(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="standard"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="video-lesson"
                                    label="url de la vidéo du cours"
                                    type="text"
                                    id="video-lesson"
                                    value={videoLesson}
                                    onChange={e => setVideoLesson(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    multiline
                                    rows={2}
                                    inputProps={{ maxRows:20, maxLength: 1500 }}
                                    placeholder="Description avec un maximum de 1500 caractères"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="description"
                                    label="Description du cours"
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{display: 'flex', alignItems:"center", gap: 1}}>
                                    <Typography>
                                        Les Etapes :
                                    </Typography>
                                    {steps.length > 0 && steps.map((step, index) => <Chip key={index} label={`Etape ${index+1}`} variant="outlined" />)}
                                </Box>
                                {addStep 
                                ? <Box >
                                    <Grid item xs={8}>
                                        <TextField
                                            variant="standard"
                                            margin="normal"
                                            fullWidth
                                            id="img-step"
                                            label="url de l'image de l'étape"
                                            type="text"
                                            name="image_step"
                                            onChange={e => handleStep(e, 'image')}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            multiline
                                            rows={2}
                                            inputProps={{ maxRows:10, maxLength: 256 }}
                                            placeholder="Etape avec un minimum de 30 caractères et un maximum de 256 caractères"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="step"
                                            label="Etape du cours"
                                            type="text"
                                            id="step"
                                            onChange={e => handleStep(e, 'content')}
                                        />
                                    </Grid>
                                    <Button onClick={handleCancelStep}>
                                        Annuler
                                    </Button>
                                    <Button onClick={handleSteps}>
                                        Ajouter l'étape
                                    </Button>
                                  </Box>
                                : <Button onClick={handleAddStep}>
                                    Ajouter une étape
                                  </Button>
                            }
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Mettre ce cours en ligne
                        </Button>
                    </Box>
                </>
            }
        </Box>
    );

}

export default NewLesson;
