import React, { useEffect, useState } from "react";
import { API } from "../api";
import { Link } from "react-router-dom";
import { 
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Box
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  const fetchMovies = async () => {
    try {
      const res = await API.get("/movies");
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await API.get(`/movies/search?q=${query}`);
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 2, mb: 4, mt: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Box>

      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={12} md={4} key={movie.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {movie.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Genre: {movie.genre}
                </Typography>
                <Link 
                  to={`/movie/${movie.id}`}
                  style={{ 
                    textDecoration: 'none', 
                    color: '#1976d2'
                  }}
                >
                  <Typography sx={{ '&:hover': { textDecoration: 'underline' } }}>
                    View Details
                  </Typography>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}