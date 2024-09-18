import React from 'react';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const EyeIconButton = ({ showPassword, onClick }) => {
    return (
        <IconButton onClick={onClick} edge="end" aria-label="toggle password visibility">
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
    );
};

export default EyeIconButton;