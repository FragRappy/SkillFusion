import React from 'react';
import { Typography, Box } from "@mui/material"

const Step = ({ step, index }) => {
    const { image, content } = step
    console.log(step)
    return (
        <Box sx={{display: 'flex', flexDirection:'column', gap: 1, mb:4, mt: 2}}>
            {image && <img src={image} alt={`Image de l'étape ${index + 1}`} />}
            {content && <Typography component='p' variant='body'>{content}</Typography>}
        </Box>
    );
};

export default Step;