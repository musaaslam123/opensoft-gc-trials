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
const StyledBox = styled(Box)(({ theme }) => ({
  height: '100vh',
  backgroundColor: '#0a0a0a',
  color: '#fff',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px'
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.05)'
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '4px'
  }
}));

const HeroSection = styled(Box)(({ theme }) => ({
  height: '60vh',
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(10, 10, 10, 0.8), #0a0a0a)'
  }
}));

const ContentSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  padding: theme.spacing(4, 0)
}));


const GlassCard = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(30, 30, 30, 0.7)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(255, 255, 255, 0.1)',
  padding: theme.spacing(3),
}));

const MovieInfoChip = styled(Chip)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  color: '#fff',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
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
    <StyledBox>
      {/* Hero Section with Parallax Effect */}
      <Box
        sx={{
          height: '70vh',
          position: 'relative',
          backgroundImage: `linear-gradient(to bottom, 
            rgba(10, 10, 10, 0.8) 0%,
            rgba(10, 10, 10, 0.9) 50%,
            rgba(10, 10, 10, 1) 100%),
            url(${movie.poster})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <ContentSection>
          <Container maxWidth="lg">
            <Grid
              container
              spacing={4}
              sx={{
                height: '100%',
                alignItems: 'flex-end',
                pb: 4
              }}
            >
              <Grid item xs={12} md={3}>
                <Box
                  component="img"
                  src={movie.poster}
                  alt={movie.title}
                  sx={{
                    width: '100%',
                    borderRadius: 2,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                    transform: 'translateY(25%)',
                  }}
                />
              </Grid>
              <Grid item xs={12} md={9}>
                <Typography
                  variant="h2"
                  fontWeight="800"
                  sx={{
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    mb: 2
                  }}
                >
                  {movie.title}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                  {movie.genres.map((genre) => (
                    <MovieInfoChip
                      key={genre}
                      label={genre}
                      size="small"
                    />
                  ))}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FaStar color="#f5c518" />
                    <Typography variant="h6">
                      {movie.imdb?.rating}/10
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FaRegClock />
                    <Typography variant="h6">
                      {movie.runtime} min
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FaLanguage />
                    <Typography variant="h6">
                      {movie.languages?.[0]}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </ContentSection>
      </Box>

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <GlassCard elevation={0}>
              <Typography variant="h5"
                sx={{
                  borderBottom: '2px solid #333',
                  pb: 2,
                  mb: 3
                }}
              >
                Overview
              </Typography>
              <Typography
                variant="body1"
                color="grey.300"
                sx={{ lineHeight: 1.8 }}
              >
                {movie.fullplot || movie.plot}
              </Typography>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h5"
                  sx={{
                    borderBottom: '2px solid #333',
                    pb: 2,
                    mb: 3
                  }}
                >
                  Cast
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {movie.cast.map((actor) => (
                    <MovieInfoChip
                      key={actor}
                      label={actor}
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            </GlassCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <GlassCard elevation={0} sx={{ mb: 3 }}>
              <Typography variant="h6"
                sx={{
                  borderBottom: '2px solid #333',
                  pb: 2,
                  mb: 3
                }}
              >
                Ratings
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <FaAward color="#f5c518" />
                  <Typography variant="subtitle1">IMDB Rating</Typography>
                </Box>
                <Rating
                  value={movie.imdb?.rating / 2}
                  precision={0.1}
                  readOnly
                  sx={{ color: '#f5c518', mb: 1 }}
                />
                <Typography variant="body2" color="grey.400">
                  {movie.imdb?.rating}/10 ({movie.imdb?.votes.toLocaleString()} votes)
                </Typography>
              </Box>

              {movie.tomatoes && (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <FaGlobe color="#ff6347" />
                    <Typography variant="subtitle1">Rotten Tomatoes</Typography>
                  </Box>
                  <Box sx={{ pl: 2 }}>
                    <Typography variant="body2" color="grey.400">
                      Critic Score: {movie.tomatoes.critic?.meter}%
                    </Typography>
                    <Typography variant="body2" color="grey.400">
                      Audience Score: {movie.tomatoes.viewer?.meter}%
                    </Typography>
                  </Box>
                </Box>
              )}
            </GlassCard>

            <GlassCard elevation={0}>
              <Typography variant="h6"
                sx={{
                  borderBottom: '2px solid #333',
                  pb: 2,
                  mb: 3
                }}
              >
                Additional Details
              </Typography>
              {[
                { label: 'Director', value: movie.directors?.join(', ') },
                { label: 'Release Date', value: new Date(movie.released).toLocaleDateString() },
                { label: 'Languages', value: movie.languages?.join(', ') }
              ].map((detail) => (
                <Box key={detail.label} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="grey.400">
                    {detail.label}
                  </Typography>
                  <Typography variant="body1">
                    {detail.value}
                  </Typography>
                </Box>
              ))}
            </GlassCard>
          </Grid>
        </Grid>
      </Container>
    </StyledBox>
  );
}