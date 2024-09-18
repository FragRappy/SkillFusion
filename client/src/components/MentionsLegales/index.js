// import React from 'react';
// import Header from '../App/Header';
// import Footer from '../App/Footer';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { Box, CssBaseline, Typography } from '@mui/material';
// import { useState, useEffect } from "react";
// import background from '../../../public/images/header-bg.svg';




// const MentionsLegales = () => {

//     const [mode, setMode] = useState(localStorage.getItem('theme-color') || 'light');
//     const theme = createTheme({
//         palette: {
//             mode: mode,
//         },
//     });;
//     const toggleColorMode = () => {
//         setMode(prev => prev === 'light' ? 'dark' : 'light');
//     };

//     return (

//         <ThemeProvider theme={theme}>
//             <CssBaseline />
//             <Header mode={mode} toggleColorMode={toggleColorMode} />
//             <Box
//                 sx={{
//                     pt: 12,
//                     pb: 6,
//                     px: 6,
//                     position: 'relative',
//                     "::before": {
//                         content: `''`,
//                         opacity: 0.05,
//                         top: 0,
//                         right: 0,
//                         bottom: 0,
//                         left: 0,
//                         display: 'inline-block',
//                         position: 'absolute',
//                         backgroundImage: `url(${background})`,
//                         backgroundSize: '200px',
//                         zIndex: '-100',
//                     }}}>
//                 <Box component='section'>
//                     <Typography component="h1" variant='h1' sx={{
//                         fontSize: { xs: '2rem', sm: '3rem' },
//                         fontWeight: 400,
//                         display: 'flex',
//                         alignSelf: 'center',
//                         textAlign: 'center',
//                     }}>
//                         Conditions Générales d'Utilisation
//                     </Typography>
//                     <Box component='article' sx={{ mt: 4 }}>
//                         <Typography component="p" variant="p">
//                             Bienvenue sur SkillFusion !
//                         </Typography>
//                         <Typography component="p" variant="p">
//                             Veuillez lire attentivement les présentes Conditions Générales d'Utilisation ("CGU") avant d'utiliser notre site web et nos services.
//                         </Typography>
//                         <Typography component="p" variant="p">
//                             En accédant ou en utilisant SkillFusion, vous acceptez d'être lié par ces CGU. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site.
//                         </Typography>
//                     </Box>
//                 </Box>

//                 <Box component='section' sx={{ mt: 4 }}>
//                     <Typography component="h2" sx={{
//                         fontSize: { xs: '1.5rem', sm: '2rem' },
//                         fontWeight: 400
//                     }}>
//                         1. Utilisation du Site
//                     </Typography>
//                     <Box component='article' sx={{
//                         mx: 2,
//                     }
//                     }>
//                         <Typography component="p" sx={{ mt: 1 }}>
//                             1.1. SkillFusion est un site de bricolage Do it yourself (DIY) destiné à fournir des informations, des conseils, des tutoriels et un espace de discussion pour les amateurs de bricolage.
//                         </Typography>
//                         <Typography component="p" sx={{ mt: 1 }}>
//                             1.2. Vous acceptez d'utiliser SkillFusion uniquement à des fins légales et conformément à ces CGU.
//                         </Typography>
//                         <Typography component="p" sx={{ mt: 1 }}>
//                             1.3. Vous êtes responsable de maintenir la confidentialité de votre compte et de votre mot de passe, et de toutes les activités qui se déroulent sous votre compte.
//                         </Typography>
//                     </Box>
//                 </Box>

//                 <Box component='section' sx={{ mt: 4 }}>
//                     <Typography component="h2" sx={{
//                         fontSize: { xs: '1.5rem', sm: '2rem' },
//                         fontWeight: 400
//                     }}>
//                         2. Espace Commentaire et Communauté
//                     </Typography>
//                     <Box component='article' sx={{
//                         mx: 2,
//                     }
//                     }>
//                         <Typography component="p" sx={{ mt: 1 }}>
//                             2.1. SkillFusion offre un espace commentaire où les membres peuvent discuter entre eux, poser des questions et partager leurs expériences.
//                         </Typography>
//                         <Typography component="p" sx={{ mt: 1 }}>
//                             2.2. Vous vous engagez à respecter les autres membres de la communauté et à ne pas publier de contenu offensant, diffamatoire, obscène, ou contraire à la loi.
//                         </Typography>
//                         <Typography component="p" sx={{ mt: 1 }}>
//                             2.3. SkillFusion se réserve le droit de modérer les commentaires et de supprimer tout contenu qui enfreint ces CGU.
//                         </Typography>
//                     </Box>
//                 </Box>

//                 <Box component='section' sx={{ mt: 4 }}>
//                     <Typography component="h2" sx={{
//                         fontSize: { xs: '1.5rem', sm: '2rem' },
//                         fontWeight: 400
//                     }}>
//                         3. Profil Utilisateur
//                     </Typography>
//                     <Box component='article' sx={{
//                         mx: 2,
//                     }}>
//                         <Typography component="p" sx={{ mt: 1 }}>
//                             3.1. SkillFusion propose une page de profil où vous pouvez fournir des informations personnelles telles que votre pseudonyme, votre adresse e-mail, etc.
//                         </Typography>
//                         <Typography component="p" sx={{ mt: 1 }}>
//                             3.2. Vous êtes responsable de l'exactitude et de la mise à jour de vos informations de profil.
//                         </Typography>
//                         <Typography component="p" sx={{ mt: 1 }}>
//                             3.3. Nous nous engageons à protéger vos informations personnelles conformément à notre Politique de Confidentialité.
//                         </Typography>
//                     </Box>
//                 </Box>

//                 <Box component='section' sx={{ mt: 4 }}>
//                     <Typography component="h2" sx={{
//                         fontSize: { xs: '1.5rem', sm: '2rem' },
//                         fontWeight: 400
//                     }}>
//                         4. Propriété Intellectuelle
//                     </Typography>
//                     <Box component='article' sx={{
//                         mx: 2
//                     }}>
//                         <Typography component="p" sx={{ mt: 1 }}>
//                             4.1. Tout le contenu publié sur SkillFusion, y compris les articles, les tutoriels, les images, etc., est protégé par les lois sur le droit d'auteur et reste la propriété de SkillFusion ou de ses contributeurs.
//                         </Typography>
//                         <Typography component="p" sx={{ mt: 1 }}>
//                             4.2. Vous acceptez de ne pas copier, reproduire, distribuer ou exploiter de quelque manière que ce soit le contenu de SkillFusion sans autorisation préalable.
//                         </Typography>
//                     </Box>
//                 </Box>

//                 <Box component='section' sx={{ mt: 4 }}>
//                     <Typography component="h2" sx={{
//                         fontSize: { xs: '1.5rem', sm: '2rem' },
//                         fontWeight: 400
//                     }}>
//                         5. Limitation de Responsabilité
//                     </Typography>
//                     <Box component='article' sx={{
//                         mx: 2
//                     }}>
//                         <Typography component="p" sx={{ mt: 1 }}>
//                             5.1. SkillFusion fournit des informations et des conseils à titre informatif seulement. Nous ne garantissons pas l'exactitude, l'exhaustivité ou la pertinence du contenu.
//                         </Typography>
//                         <Typography component="p" sx={{ mt: 1 }}>
//                             5.2. En utilisant SkillFusion, vous reconnaissez que vous le faites à vos propres risques et que SkillFusion, ses propriétaires, administrateurs, et affiliés ne seront pas tenus responsables des dommages directs, indirects, accessoires, spéciaux ou consécutifs résultant de votre utilisation du site.
//                         </Typography>
//                     </Box>
//                 </Box>

//                 <Box component='section' sx={{ mt: 4 }}>
//                     <Typography component="h2" sx={{
//                         fontSize: { xs: '1.5rem', sm: '2rem' },
//                         fontWeight: 400
//                     }}>
//                         6. Modifications des CGU
//                     </Typography>
//                     <Box component='article' sx={{
//                         mx: 2
//                     }}>
//                         <Typography component="p" sx={{ mt: 1 }}>
//                             6.1. SkillFusion se réserve le droit de modifier ces CGU à tout moment. Toute modification sera effective dès sa publication sur le site.
//                         </Typography>
//                         <Typography component="p" sx={{ mt: 1 }}>
//                             6.2. Il est de votre responsabilité de consulter régulièrement les CGU pour prendre connaissance des éventuelles modifications.
//                         </Typography>
//                         <Typography component="p" sx={{ mt: 1 }}>
//                             En utilisant SkillFusion après la publication de modifications, vous acceptez d'être lié par les CGU modifiées.
//                         </Typography>
//                     </Box>
//                 </Box>

//                 <Box component='section' sx={{ mt: 4 }}>
//                     <Typography component="h2" sx={{
//                         fontSize: { xs: '1.5rem', sm: '2rem' },
//                         fontWeight: 400
//                     }}>
//                         7. Contact
//                     </Typography>
//                     <Typography component="p" sx={{ mt: 1 }}>
//                         Si vous avez des questions ou des préoccupations concernant ces CGU, veuillez nous contacter à l'adresse suivante : <a href="mailto:ligmajorg@gmail.com">ligmajorg@gmail.com</a>.
//                     </Typography>
//                 </Box>
//             </Box>
//             <Footer />
//         </ThemeProvider>
//     );
// };

// export default MentionsLegales;