import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Add this import at the top
import { API } from "../api";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";

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
import { FaStar } from "react-icons/fa";
import "../styles/movielist.css";
export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  const [popularMovie, setPopularMovie] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
    )
      .then((res) => res.json())
      .then((data) => setPopularMovie(data.results));
  }, []);

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
    <Box 
      sx={{ 
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        margin: 0,
        padding: 0,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          position: 'fixed',
          left: '50%',
          top: '40%',
          transform: 'translateX(-50%)',
          zIndex: 1200,
          width: '50%',
          maxWidth: '600px',
          minWidth: '300px',
          padding: '10px',
          backdropFilter: 'blur(2px)',
          borderRadius: '30px',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ 
                color: 'white',
                opacity: 0.9,
                mr: 1 
              }} />
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              borderRadius: '30px',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.7)',
              },
            },
            '& .MuiOutlinedInput-input': {
              color: 'white',
              '&::placeholder': {
                color: 'rgba(255, 255, 255, 0.7)',
                opacity: 1,
              },
            },
          }}
        />
      </Box>

      <Carousel
        className="carousel no-select"
        showThumbs={false}
        autoPlay={true}
        showIndicators={false}
        interval={5000}
        transitionTime={1000}
        infiniteLoop={true}
        showStatus={false}
        showArrows={true}
        dynamicHeight={false}
        stopOnHover={false}
        swipeable={true}
        emulateTouch={true}
        useKeyboardArrows={true}
        style={{ height: '100%' }}
        preventMovementUntilSwipeScrollTolerance={false}
      >
        {popularMovie.map((user) => (
          <div key={user.id} style={{ width: '100vw', height: '100%' }} className="no-select">
            <Box
              style={{ textDecoration: "none", color: "white", height: '100%', display: 'block' }}
              // to={`/movie/${user.id}`}
            >
              <div style={{ 
                height: '100vh',
                position: 'relative',
                backgroundColor: '#000'
              }}>
                <img
                  src={`https://image.tmdb.org/t/p/original${user.backdrop_path}`}
                  alt={user.original_title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: '0.6'
                  }}
                />
                <div className="poster-overlay">
                  <div className="poster-title">
                    {user ? user.original_title : ""}
                  </div>
                  <div className="poster">
                    {user ? user.release_date : ""}
                    <span className="poster-rating">
                      {user ? user.vote_average : ""}
                      <FaStar />{" "}
                    </span>
                  </div>
                  {/* <div className="poster-description">
                    {user ? user.overview : ""}
                  </div> */}
                </div>
              </div>
            </Box>
          </div>
        ))}
      </Carousel>
    </Box>
  );
}