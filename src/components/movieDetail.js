import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Chip,
  Rating,
  Divider,
  CircularProgress
} from '@mui/material';
import { styled } from "@mui/material/styles";
import { FaAward, FaStar, FaRegClock, FaGlobe, FaLanguage } from "react-icons/fa";
const BACKEND_SERVER_URL = "http://localhost:5000"

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1a1a1a',
  color: '#fff',
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  minHeight: '80vh'
}));

const DetailTypography = styled(Typography)(({ theme }) => ({
  color: '#ccc',
  marginBottom: theme.spacing(1)
}));

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovie = async () => {
    try {
      const res = await fetch(`${BACKEND_SERVER_URL}/movies/movie/${id}`);
      const data = await res.json();
      setMovie(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#121212">
      <CircularProgress color="primary" />
    </Box>
  );

  if (!movie) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#121212">
      <Typography color="error">Movie not found</Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        height: '100vh',
        overflow: 'auto',
        backgroundColor: '#121212',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#1e1e1e',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#333',
          borderRadius: '4px',
        },
      }}
    >
      {/* Hero Section - Fixed Height */}
      <Box
        sx={{
          height: '60vh',
          position: 'relative',
          backgroundImage: `linear-gradient(to bottom, rgba(18, 18, 18, 0.7), rgba(18, 18, 18, 1)), url(${movie.poster})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            mt: 8,
            mb: 4,
            position: 'relative',
            zIndex: 1
          }}
        >
          <Grid container spacing={4} alignItems="flex-end">
            <Grid item xs={12} md={3}>
              <Paper
                elevation={12}
                sx={{
                  overflow: 'hidden',
                  borderRadius: 2,
                  transform: 'translateY(50%)',
                }}
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                {movie.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                {movie.genres.map((genre) => (
                  <Chip
                    key={genre}
                    label={genre}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                    }}
                  />
                ))}
              </Box>
              <Typography variant="h6" color="grey.400">
                {movie.year} • {movie.runtime} min
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" gutterBottom>Overview</Typography>
              <Typography variant="body1" color="grey.300" paragraph>
                {movie.fullplot || movie.plot}
              </Typography>

              <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

              <Typography variant="h6" gutterBottom>Cast</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {movie.cast.map((actor) => (
                  <Chip
                    key={actor}
                    label={actor}
                    variant="outlined"
                    sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
                mb: 3,
              }}
            >
              <Typography variant="h6" gutterBottom>Ratings</Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="grey.400">IMDB</Typography>
                <Rating
                  value={movie.imdb?.rating / 2}
                  precision={0.1}
                  readOnly
                  sx={{ color: '#f5c518' }}
                />
                <Typography variant="body2">
                  {movie.imdb?.rating}/10 ({movie.imdb?.votes.toLocaleString()} votes)
                </Typography>
              </Box>

              {movie.tomatoes && (
                <Box>
                  <Typography variant="subtitle2" color="grey.400">
                    Rotten Tomatoes
                  </Typography>
                  <Typography variant="body2">
                    Critic: {movie.tomatoes.critic?.meter}%
                  </Typography>
                  <Typography variant="body2">
                    Audience: {movie.tomatoes.viewer?.meter}%
                  </Typography>
                </Box>
              )}
            </Paper>

            <Paper
              sx={{
                p: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>Details</Typography>
              <Typography variant="subtitle2" color="grey.400">Director</Typography>
              <Typography variant="body2" paragraph>
                {movie.directors?.join(', ')}
              </Typography>

              <Typography variant="subtitle2" color="grey.400">Release Date</Typography>
              <Typography variant="body2" paragraph>
                {new Date(movie.released).toLocaleDateString()}
              </Typography>

              <Typography variant="subtitle2" color="grey.400">Languages</Typography>
              <Typography variant="body2">
                {movie.languages?.join(', ')}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
