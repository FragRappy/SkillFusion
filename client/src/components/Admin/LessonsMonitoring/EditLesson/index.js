import { useState, useEffect } from "react";
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import LinearProgress from '@mui/material/LinearProgress';
import { Alert } from "@mui/material";

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="première page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="page précedente"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="page suivante"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="dernière page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

const EditLesson = ({role}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [lessons, setLessons] = useState([]);
    const [success, setSuccess] = useState(false);
    const [lessonDeleted, setLessonDeleted] = useState(null);
    const [update, setUpdate] = useState({});

    const getLessons = async () => {
        try {
            setLoading(true);

            const response = await fetch(`http://fragrappy-server.eddi.cloud:8080/lessons/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const { data, status, message } = await response.json();
 
            if (status === 'Succès') {
                
                setLessons(data);
            } else {
                setError(message);
            };
            
        } catch (error) {
            setError(`Le serveur ne répond pas : ${error.message}`);
        } finally {
            setLoading(false);
        };
    };

    const getLessonsByRole = async () => {
   
        try {
            setLoading(true);
            const response = await fetch(`http://fragrappy-server.eddi.cloud:8080/lessons/byrole`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const { data, status, message } = await response.json();
            
            if (status === 'Succès') {
                setLessons(data);
            } else {
                setError(message);
            };

        } catch (error) {
            setError(`Le serveur ne répond pas : ${error.message}`);
        } finally {
            setLoading(false);
        };
    };

    const deleteLesson = async (lesson) => {
        try {
            setLoading(true);
            const response = await fetch(`http://fragrappy-server.eddi.cloud:8080/lessons`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    lesson
                }),
            });

            const { status, message } = await response.json();
            
            if (status === 'Succès') {
                setLessonDeleted(lesson.id)
                setSuccess(message);
                setTimeout(() => {
                    setSuccess(null)
                    setLessonDeleted(null)
                    setUpdate({})
                }, 4000)
            } else {
                setError(message);
            };

        } catch (error) {
            setError(`Le serveur ne répond pas : ${error.message}`);
        } finally {
            setLoading(false);
        };
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - lessons.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
         role === 'admin' ? getLessons() : getLessonsByRole()
    }, [update])
   
    return (
        <TableContainer component={Paper}>
            {loading && <Box sx={{ width: '100%' }}><LinearProgress /></Box>}
            <Table aria-label="Liste des utilisateurs">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        {role && role === 'admin' && <TableCell align="left">Auteur du cours</TableCell>}
                        <TableCell align="left">Titre du cours</TableCell>
                        <TableCell align="left">Categories du cours</TableCell>
                        <TableCell align="center">Note du cours</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? lessons && lessons.sort((a, b) => (a.title < b.title ? -1 : 1)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : lessons
                    ).map((lesson) => (
                        <TableRow key={lesson.id}>
                            <TableCell style={{ width: 80 }} component="th" scope="row" >
                                <img src={lesson.image} style={{maxWidth: '80px'}}/>
                            </TableCell>
                                {role === 'admin' && <TableCell style={{ width: 160 }} component="th" scope="row" align="left">{lesson.author}</TableCell>}
                            <TableCell component="th" scope="row" align="left">
                                <Typography>{lesson.title}</Typography>
                            </TableCell>
                            <TableCell style={{ width: 100 }} component="th" scope="row" align="left">
                                <Stack direction="column" spacing={1}>
                                    {lesson.Categories && lesson.Categories.map(category => <Chip key={category.id} label={`${category.name}`} variant="outlined" />)}
                                </Stack>
                            </TableCell>
                            <TableCell style={{ width: 50 }} component="th" scope="row" align="center">
                                {lesson.rate && <Rating name="read-only" value={parseInt(lesson.rate)} size="small" readOnly />}
                            </TableCell>
                            <TableCell style={{ width: 50 }} align="center">
                               <Button size='small'>Editer</Button>
                            </TableCell>
                            <TableCell style={{ width: 50 }} align="center">
                                {lesson.id === lessonDeleted 
                                && success 
                                ? <Alert severity="success">{success}</Alert>
                                : error
                                ? <Alert severity="error">{error}</Alert>
                                : <Button size='small' onClick={() => deleteLesson(lesson)}>Supprimer</Button>
                                }
                            </TableCell>
                            <TableCell style={{ width: 80 }} align="center">
                                <Button size='small' to={`/cours/${lesson.id}`} component={Link}>Voir le cours</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            labelRowsPerPage= 'Cours par page:'
                            rowsPerPageOptions={[5, 10, 25, { label: 'Tout', value: -1 }]}
                            colSpan={12}
                            count={lessons.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            slotProps={{
                                select: {
                                    inputProps: {
                                        'aria-label': 'Utilisateurs par page',
                                    },
                                    native: true,
                                },
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )   
}

export default EditLesson;