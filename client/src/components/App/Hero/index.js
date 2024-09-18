import { useTheme } from '@mui/material/styles';
import { Typography, Box, Container, Stack, Link } from "@mui/material";

const Hero = () => {
    const theme = useTheme();

    return (
        <Box
            id="hero"
            sx={{width: '100%'}}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: { xs: 14, sm: 20 },
                    pb: { xs: 8, sm: 12 },
                }}
            >
                <Stack spacing={2} useFlexGap sx={{ width: '100%' }}>
                    <Typography
                        component="h1"
                        variant="h1"
                        sx={{
                            fontSize: {xs :'3rem', sm: '5rem'},
                            fontWeight: 400,
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignSelf: 'center',
                            textAlign: 'center',
                        }}
                    >
                        SkillFusion :&nbsp;
                        <Typography
                            component="span"
                            variant="h1"
                            sx={{
                                fontSize: {xs :'3rem', sm: '5rem'},
                                fontWeight: 400,
                                color: 
                                    theme.palette.mode === 'light' ? 'primary.main' : '#83b8e2',
                            }}
                        >
                            Do it yourself !
                        </Typography>
                    </Typography>
                    <Typography variant="body1" textAlign="center" color="text.secondary">
                        Venez maîtriser l'art du bricolage et de la construction.<br />
                        Nos cours s'adaptent à tous vos besoins.<br />
                        Que vous soyez débutant ou bricoleur chevronné, notre plateforme vous permettra de libérer votre potentiel, de perfectionner vos compétences et de donner vie à vos projets!
                    </Typography>
                    <Typography variant="subtitle2" textAlign="center" sx={{ opacity: 0.9 }}>
                        Vous avez déjà un compte ?&nbsp;
                        <Link href='/connexion' color="primary">
                            Connectez vous
                        </Link>
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
};

export default Hero;