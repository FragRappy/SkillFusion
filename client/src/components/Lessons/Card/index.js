import { useTheme } from '@mui/material/styles';
import { Typography, Card, CardHeader, CardContent, CardMedia, CardActions, Rating, Button, Box, CircularProgress } from "@mui/material";

const LessonCard = ({lesson, access}) => {
    const { id, image, title, author, description, rate } =  lesson;
    const theme = useTheme();

    return (
        <Card sx={{ 
            position: 'relative',
            ":hover": {
                borderColor: 
                    theme.palette.mode === 'light'
                    ? 'rgba(153, 204, 255, 1)'
                    : 'rgba(0, 102, 204, 0.5)',
                boxShadow:
                    theme.palette.mode === 'light'
                    ?'rgba(204, 229, 207, 1) 0px 2px 8px'
                    :'rgba(0, 58, 117, 0.6) 0px 2px 8px', 
            },
            maxWidth: 345, 
            m: 2 ,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow:
                theme.palette.mode === 'light'
                ? `inset 0 1px 2px rgba(243, 246, 249, 1),0 1px 2px rgba(229, 234, 242, 0.6)`
                : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
        }}>
            <CardHeader 
                title={<Typography width={'100%'}>{title && title.length > 38 ? title.slice(0, 38) : title}</Typography>}
                subheader={`Auteur : ${author}`}
            />
            <Rating sx={{position: 'absolute', top: '5.5rem', right: '1rem'}} name="read-only" value={parseInt(rate)} size="small" readOnly/>
            <Typography variant="caption" component="legend" display={"flex"} justifyContent={"right"} sx={{position: 'absolute', top: '6.5rem', right: '1rem'}}>
                {lesson.nb_rates > 1 ? (
                    (`(${lesson.nb_rates} notes)`)
                ) : (
                    (`(${lesson.nb_rates} note)`)
                )}
            </Typography>
            <CardMedia component="img" height="140" image={image} alt="description image"/>
            <CardContent>
                {   access 
                    ?   <Typography variant="body2" color="text.secondary" component="p">
                            { description && (description.length > 80) 
                                ?   `${description.slice(0,80)}...`
                                :   description
                            }
                        </Typography>
                    :   <Typography variant="body2" color="text.secondary" component="p">
                            Contenu réservé aux membres
                        </Typography>  
                }
            </CardContent>
            <CardActions sx={{float: 'right'}}>
                { 
                    access 
                    ? <Button href= {`cours/${id}`} variant="contained">
                        Voir le cours
                      </Button>  
                    : <Button href="/connexion" variant="contained">
                         Se connecter
                      </Button>
                }       
            </CardActions> 
        </Card>
    );
};

export default LessonCard;