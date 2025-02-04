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
  CircularProgress,
  Stack,
  Avatar
} from '@mui/material';
import { styled } from "@mui/material/styles";
import {
  Movie as MovieIcon,
  Schedule,
  Language,
  Star,
  People
} from '@mui/icons-material';
const BACKEND_SERVER_URL = "http://localhost:5000"


const DetailTypography = styled(Typography)(({ theme }) => ({
  color: '#ccc',
  marginBottom: theme.spacing(1)
}));

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    minHeight: '80vh'
  }));

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
    <Box sx={{
      minHeight: '100vh',
      bgcolor: 'background.default',
      overflow: 'auto',
      p: { xs: 0, md: 3 }
    }}>
      {/* Hero Section */}
      <Box sx={{
        position: 'relative',
        height: { xs: '40vh', md: '60vh' },
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url(${movie.poster})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <Container maxWidth="lg" sx={{ height: '100%' }}>
          <Grid container alignItems="center" sx={{ height: '100%' }}>
            <Grid item xs={12} md={4} sx={{ position: 'relative' }}>
              <Paper elevation={24} sx={{
                borderRadius: 2,
                overflow: 'hidden',
                position: { xs: 'relative', md: 'absolute' },
                bottom: { md: theme => theme.spacing(4) },
                width: { xs: '60%', md: '100%' },
                mx: 'auto'
              }}>
                <img src={movie.poster} alt={movie.title} style={{ width: '100%', height: 'auto' }} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
              <Stack spacing={2} sx={{
                color: 'common.white',
                textAlign: { xs: 'center', md: 'left' },
                p: 3
              }}>
                <Typography variant="h2" fontWeight={700}>{movie.title}</Typography>

                <Stack direction="row" spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                  {movie.genres.map(genre => (
                    <Chip
                      key={genre}
                      label={genre}
                      color="primary"
                      variant="outlined"
                      sx={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
                    />
                  ))}
                </Stack>

                <Stack direction="row" spacing={3} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <MovieIcon fontSize="small" />
                    <Typography>{movie.year}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Schedule fontSize="small" />
                    <Typography>{movie.runtime} min</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>Overview</Typography>
              <Typography paragraph sx={{ color: 'text.secondary' }}>
                {movie.fullplot || movie.plot}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Stack spacing={2}>
                <Typography variant="h6">Cast</Typography>
                <Grid container spacing={2}>
                  {movie.cast.map(actor => (
                    <Grid item key={actor}>
                      <Chip
                        avatar={<Avatar>{actor[0]}</Avatar>}
                        label={actor}
                        variant="outlined"
                      />
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Ratings</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        IMDB Rating
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Star color="warning" />
                        <Typography>{movie.imdb?.rating}/10</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  {movie.tomatoes && (
                    <Grid item xs={6}>
                      <Stack spacing={1}>
                        <Typography variant="body2" color="text.secondary">
                          Rotten Tomatoes
                        </Typography>
                        <Stack spacing={0.5}>
                          <Typography variant="body2">
                            Critic: {movie.tomatoes.critic?.meter}%
                          </Typography>
                          <Typography variant="body2">
                            Audience: {movie.tomatoes.viewer?.meter}%
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  )}
                </Grid>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Details</Typography>
                <Stack spacing={2}>
                  <Stack spacing={0.5}>
                    <Typography variant="body2" color="text.secondary">
                      Directed by
                    </Typography>
                    <Typography>{movie.directors?.join(', ')}</Typography>
                  </Stack>

                  <Stack spacing={0.5}>
                    <Typography variant="body2" color="text.secondary">
                      Release Date
                    </Typography>
                    <Typography>
                      {new Date(movie.released).toLocaleDateString()}
                    </Typography>
                  </Stack>

                  <Stack spacing={0.5}>
                    <Typography variant="body2" color="text.secondary">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Language fontSize="small" />
                        <span>Languages</span>
                      </Stack>
                    </Typography>
                    <Typography>{movie.languages?.join(', ')}</Typography>
                  </Stack>
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}