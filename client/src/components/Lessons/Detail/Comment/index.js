import { Typography, Box, Divider } from "@mui/material"

const Comments = ({comment}) => {
  
    return (
            <Box sx={{mt:0.1, mb:0.1}}>   
                <Typography>{comment}</Typography>
                <Divider flexItem/>
            </Box> 
    );
};

export default Comments;