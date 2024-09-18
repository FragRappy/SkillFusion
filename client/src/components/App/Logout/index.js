import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Logout = () => {
    const [confirm, setConfirm] = useState(false);

    const navigate = useNavigate();

    const handleClick = () => {
        setConfirm(true); 
    };

    const handleConfirm = () => {
        localStorage.removeItem('token'); 
        navigate('/'); 
    };

    const handleCancel = () => {
        setConfirm(false); 
    };

    return (
        <>
            {confirm ? 
                <>
                    <Button color="primary" variant="contained" size="small" onClick={handleConfirm}>Confirmer</Button>
                    <Button color="secondary" variant="contained" size="small" onClick={handleCancel}>Annuler</Button>
                </> : 
                <>
                    <Button color="primary" variant="outlined" size="small" onClick={handleClick}>Déconnexion</Button>
                </>
            }
        </>
    );
};

export default Logout;