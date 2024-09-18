import { TextField } from "@mui/material";
import { useState, useEffect } from "react";

const Search = ({lessons, setSortedLessons}) => {
    const [search, setSearch] = useState('');

    const filterSearch = (arr) => {
        return arr.filter(({ title }) => title.toLowerCase().includes(search.toLowerCase().trim()));
    }

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        const filteredLessons = filterSearch(lessons);
        setSortedLessons(filteredLessons);
    }, [search, lessons]);

    return (
        <TextField
            sx={{mb: 6, mt: 3}}
            margin="normal"
            id="search"
            label="Recherche de cours"
            fullWidth
            name="search"
            type="text"
            value={search}
            placeholder="Rechercher un cours" 
            onChange={handleChange}
        />
    );
};

export default Search;