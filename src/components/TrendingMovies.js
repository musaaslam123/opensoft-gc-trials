import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  Box,
  Rating
} from "@mui/material";
import { FaStar } from "react-icons/fa";

export default function TrendingMovies() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  const fetchMovies = async (pageNum) => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNum}`;
    
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjc2ZGRhMTk4Y2M2NjM2NGY3NjQxNWY4NWFhZWRiMCIsIm5iZiI6MTczNzgwNTIzNS4xNSwic3ViIjoiNjc5NGNkYjNiNTAwZmM3Y2EzMTgzYTFiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cpbrC9ntaBa1dgMaD-Dl_aShCDb0H1kMwfZnvvBbIHQ'
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      
      if (!response.ok || !data.results || data.results.length === 0) {
        setHasMore(false);
        return;
      }

      setTrendingMovies(prev => [...prev, ...data.results]);
      setPage(pageNum);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Initial load of first 3 pages
  useEffect(() => {
    const loadInitialPages = async () => {
      for (let i = 1; i <= 1; i++) {
        await fetchMovies(i);
      }
    };
    loadInitialPages();
  }, []);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (!containerRef.current || loading || !hasMore) return;

    const container = containerRef.current;
    const { scrollTop, clientHeight, scrollHeight } = container;

    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      fetchMovies(page + 1);
    }
  }, [loading, hasMore, page]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return (
    <Container 
      ref={containerRef}
      maxWidth="xl" 
      sx={{ 
        padding:'100px 0', 
        mt: 0, 
        mb: 4, 
        bgcolor:"black", 
        height: "100vh",
        overflow: "auto"
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, color: 'white' }}>
        Trending This Week
      </Typography>
      <Grid container spacing={3}>
        {trendingMovies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                transition: '0.3s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 0 15px rgba(255,255,255,0.2)',
                }
              }}
            >
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                sx={{ aspectRatio: '2/3' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {movie.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <FaStar style={{ color: '#faaf00', marginRight: '4px' }} />
                  <Typography variant="body2">
                    {movie.vote_average.toFixed(1)}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {movie.release_date.split('-')[0]}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <Typography color="white">Loading more movies...</Typography>
        </Box>
      )}
      {!hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <Typography color="white">No more movies to load</Typography>
        </Box>
      )}
    </Container>
  );
}
