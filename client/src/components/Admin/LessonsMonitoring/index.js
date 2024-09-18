import { useState } from "react";
import Box from '@mui/material/Box';
import NewLesson from "./NewLesson";
import EditLesson from "./EditLesson";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            style={{width: '100%'}}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography variant='p'>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const LessonsMonitoring = ({role, user}) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%'}}>
                <Tabs centered value={value} onChange={handleChange} aria-label="Menu des cours" >
                    <Tab label="Cours actifs" {...a11yProps(0)} aria-label="Cours actifs" />
                    <Tab label="Ajouter un cours" {...a11yProps(1)} aria-label="Ajouter un cours" />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0} >
                {role && <EditLesson role={role} />}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                {user && <NewLesson user={user}/>}
            </CustomTabPanel>
        </>
    )   
};

export default LessonsMonitoring;