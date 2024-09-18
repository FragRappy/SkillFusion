import { useState, useEffect } from "react";
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
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
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

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

const UsersMonitoring = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [users, setUsers] = useState([]);
    const [userUpdate, setUserUpdate] = useState(null)
    const [successUpdate, setSuccessUpdate] = useState(null);
    const [userDelete, setUserDelete] = useState(null)
    const [successDelete, setSuccessDelete] = useState(null);
    const [update, setUpdate] = useState({});

    const getUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://fragrappy-server.eddi.cloud:8080/users/all`);

            const { data, status, message, error } = await response.json();
    
            if(status === "Succès") {
                
                setUsers(data);
                setRole(data.role)
            } else {
                setRole(null)
            }
        } catch(error) {
            setError(error.message);
        } finally {
            setLoading(false);
        };
    }

    const handleUpdate = async (role, id) => {
        try {
            setLoading(true);
            const response = await fetch(`http://fragrappy-server.eddi.cloud:8080/users/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, 
                },
                body: JSON.stringify({
                    role
                }),
            });;

            const { status, message } = await response.json();
    
            if(status === "Succès") {
                setUserUpdate(id)
                setSuccessUpdate(message)
                setTimeout(() => {
                    setSuccessUpdate(null)
                    setUserUpdate(null)
                    setUpdate({})
                }, 4000)
            }
        } catch(error) {
            setError(error.message);
        } finally {
            setLoading(false);
        };
    }

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`http://fragrappy-server.eddi.cloud:8080/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, 
                }
            });

            const {status, message} = await response.json()

            if(status === 'Succès') {
                setUserDelete(id)
                setSuccessDelete(message)
                setTimeout(() => {
                    setSuccessDelete(null)
                    setUserDelete(null)
                    setUpdate({})
                }, 4000)
            } 
        } catch(error) {
            setError(error);
        } finally {
            setLoading(false);
        };
    }

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChange = (e, user_id) => {
        handleUpdate(e.target.value, parseInt(user_id));
      };
    

    useEffect(() => {
        getUsers()
    }, [update])

    return (
        <TableContainer component={Paper}>
            {loading && <Box sx={{ width: '100%' }}><LinearProgress /></Box>}
            <Table aria-label="Liste des utilisateurs">
            <TableHead>
                    <TableRow>
                        <TableCell align="left">Utilisateur</TableCell>
                        <TableCell align="left">Rôle</TableCell>
                        <TableCell align="left">Date de création</TableCell>
                        <TableCell align="center">Changer le rôle</TableCell>
                        <TableCell align="center"></TableCell>
                      
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? users.sort((a, b) => (a.username < b.username ? -1 : 1)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : users
                    ).map((user) => ( 
                        <TableRow key={user.id}>
                            <TableCell component="th" scope="row" align="left">
                                <Typography>{user.username}</Typography>
                            </TableCell>
                            <TableCell component="th" scope="row" align="left">
                                <Typography>{user.role === 'admin' ? 'Administrateur' : user.role === 'instructor' ? 'Instructeur' : 'Membre'}</Typography>
                            </TableCell>
                            <TableCell component="th" scope="row" align="left">
                                <Typography>{user.createdAt}</Typography>
                            </TableCell>
                            <TableCell style={{ width: 200 }} align="center">
                                {user.id === userUpdate ?
                                    <Alert severity="success">{successUpdate}</Alert> :
                                    <FormControl fullWidth>
                                        <InputLabel id="select-role">Rôle</InputLabel>
                                        <Select
                                            labelId="select-role"
                                            id="select-role"
                                            label="Rôle"
                                            value={''}
                                            onChange={(e) => handleChange(e, user.id)}
                                        >
                                            <MenuItem value={'member'}>Membre</MenuItem>
                                            <MenuItem value={'instructor'}>Instructeur</MenuItem>
                                            <MenuItem value={'admin'}>Administrateur</MenuItem>
                                        </Select>
                                    </FormControl>
                                }
                            </TableCell>
                            <TableCell style={{ width: 200 }} align="center">
                                {user.id === userDelete ?
                                    <Alert severity="success">{successDelete}</Alert> :
                                    <Button size='small' onClick={() => handleDelete(user.id)}>Supprimer</Button>
                                }
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
                            labelRowsPerPage= 'Utilisateurs par page:'
                            rowsPerPageOptions={[5, 10, 25, { label: 'Tout', value: -1 }]}
                            colSpan={12}
                            count={users.length}
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
};

export default UsersMonitoring;