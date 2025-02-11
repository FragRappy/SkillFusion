import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';

function ToggleColorMode({ mode, toggleColorMode }) {
    mode === 'light' ? localStorage.setItem('theme-color', 'light') : localStorage.setItem('theme-color', 'dark');

    return (
        <Box sx={{ maxWidth: '32px' }}>
            <Button
                variant="text"
                onClick={toggleColorMode}
                size="small"
                aria-label="bouton pour changer la couleur du thème"
                sx={{ minWidth: '32px', height: '32px', p: '4px' }}
            >
                {mode === 'dark' ? (
                    <WbSunnyRoundedIcon fontSize="small" />
                ) : (
                    <ModeNightRoundedIcon fontSize="small" />
                )}
            </Button>
        </Box>
    );
}

export default ToggleColorMode;