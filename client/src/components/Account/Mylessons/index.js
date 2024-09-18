import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableRow, Paper, IconButton, LinearProgress } from "@mui/material";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

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

const MyLessons = () => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [update, setUpdate] = useState({})

    const getFollowedLessons = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://fragrappy-server.eddi.cloud:8080/users/follow', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const { data, status, message} = await response.json();
            if (status === 'Succès') {
                setLessons(data);
            } else {
                setError(message);
            };
        } catch (error) {
            setError(`Erreur : ${error.message}`);
        } finally {
            setLoading(false);
        };
    };

    const handleDeleteFollow = async (lesson_id) => {
        try {
            setLoading(true);
            const response = await fetch(`http://fragrappy-server.eddi.cloud:8080/users/unfollow/${lesson_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const { status, message} = await response.json();
            if(status === 'Succès') {
                setSuccess(message);
                setUpdate({})
                setTimeout(() => {
                    setSuccess(null);
                }, 5000)
            }
            if (status === 'Erreur') {
                setError(message);
                setTimeout(() => {
                    setError(null);
                }, 5000)
            };
        } catch (error) {
            setError(`Le serveur ne répond pas : ${error.follow}`);
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
        getFollowedLessons();
    }, [update]);
    
    return (
        <TableContainer component={Paper}>
            {loading && <Box sx={{ width: '100%' }}><LinearProgress /></Box>}
            <Table aria-label="Liste des cours suivies">
                <TableBody>
                    {(rowsPerPage > 0
                        ? lessons.sort((a, b) => (a.title < b.title ? -1 : 1)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : lessons
                    ).map((lesson) => (
                        <TableRow key={lesson.id}>
                            <TableCell style={{ width: 160 }}  component="th" scope="row" >
                                <img src={lesson.image} style={{maxWidth: '100px'}}/>
                            </TableCell>
                            <TableCell component="th" scope="row" align="left">
                                <Typography>{lesson.title}</Typography>
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                               <Button size='small' onClick={() => handleDeleteFollow(lesson.id)}>Ne plus suivre</Button>
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
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
                            labelRowsPerPage= 'Cours suivis par page:'
                            rowsPerPageOptions={[5, 10, 25, { label: 'Tout', value: -1 }]}
                            colSpan={12}
                            count={lessons.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            slotProps={{
                                select: {
                                    inputProps: {
                                        'aria-label': 'Cours suivis par page',
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
    );
};

export default MyLessons;