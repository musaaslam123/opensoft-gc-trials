import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../api";
import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  Rating,
  Divider,
  Paper,
  CircularProgress
} from "@mui/material";
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
      const res = await fetch(`${BACKEND_SERVER_URL}/movies/${id}`);
      setMovie(res.data);
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
    <Box sx={{ bgcolor: '#121212', minHeight: '100vh', py: 4 }}>
      <Container>
        <StyledPaper elevation={3}>
          <Grid container spacing={4}>
            {/* Left side - Poster */}
            <Grid item xs={12} md={4}>
              <Box
                component="img"
                src={movie.poster}
                alt={movie.title}
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.5)'
                }}
              />
            </Grid>

            {/* Right side - Details */}
            <Grid item xs={12} md={8}>
              <Typography variant="h4" fontWeight="bold" mb={2}>
                {movie.title} ({movie.year})
              </Typography>

              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Chip
                  icon={<FaStar />}
                  label={`IMDb ${movie.imdb.rating}/10`}
                  color="primary"
                />
                <Chip
                  icon={<FaRegClock />}
                  label={`${movie.runtime} mins`}
                  color="secondary"
                />
                <Chip label={movie.rated} variant="outlined" />
              </Box>

              <DetailTypography variant="body1" paragraph>
                {movie.fullplot || movie.plot}
              </DetailTypography>

              <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.1)' }} />

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <DetailTypography>
                    <strong>Director:</strong> {movie.directors.join(', ')}
                  </DetailTypography>
                  <DetailTypography>
                    <strong>Cast:</strong> {movie.cast.join(', ')}
                  </DetailTypography>
                  <DetailTypography>
                    <strong>Genres:</strong> {movie.genres.join(', ')}
                  </DetailTypography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <DetailTypography>
                    <Box display="flex" alignItems="center" gap={1}>
                      <FaGlobe />
                      <strong>Countries:</strong> {movie.countries.join(', ')}
                    </Box>
                  </DetailTypography>
                  <DetailTypography>
                    <Box display="flex" alignItems="center" gap={1}>
                      <FaLanguage />
                      <strong>Languages:</strong> {movie.languages.join(', ')}
                    </Box>
                  </DetailTypography>
                  <DetailTypography>
                    <Box display="flex" alignItems="center" gap={1}>
                      <FaAward />
                      <strong>Awards:</strong> {movie.awards.text}
                    </Box>
                  </DetailTypography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </StyledPaper>
      </Container>
    </Box>
  );
}
