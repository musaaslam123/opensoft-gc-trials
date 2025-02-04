import React, { useEffect, useState, useCallback } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { API } from "../api";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import debounce from 'lodash/debounce';
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const BACKEND_SERVER_URL = "http://localhost:5000";

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
      const res = await fetch(`/movies/search?q=${query}`);
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const debouncedSearch = useCallback(
    debounce(async (searchQuery) => {
      if (!searchQuery) {
        setSuggestions([]);
        return;
      }
      try {
        console.log('Fetching suggestions for:', searchQuery);

        const response = await fetch(`${BACKEND_SERVER_URL}/movies/autocomplete?q=${searchQuery}`);
        const data = await response.json();
        // Update to handle the new response structure
        if (data.success && data.data.suggestions) {
          setSuggestions(data.data.suggestions);
        }
      } catch (err) {
        console.error('Error fetching suggestions:', err);
      }
    }, 300),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title); // Updated to handle the new suggestion structure
    setShowSuggestions(false);
    console.log('Navigating to:', suggestion);

    navigate("/movie/" + suggestion.id);
  };

  useEffect(() => {
    const handleClickOutside = () => setShowSuggestions(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

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
          position: 'relative',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search movies..."
          value={query}
          onChange={handleInputChange}
          onClick={(e) => e.stopPropagation()}
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

        {/* Updated Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              maxHeight: '300px',
              overflowY: 'auto',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              borderRadius: '10px',
              mt: 1,
              zIndex: 1300,
            }}
          >
            {suggestions.map((suggestion, index) => (
              <Box
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                sx={{
                  padding: '10px 20px',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <Typography sx={{ fontSize: '1rem' }}>
                  {suggestion.title}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Rest of the Carousel component remains unchanged */}
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
                </div>
              </div>
            </Box>
          </div>
        ))}
      </Carousel>
    </Box>
  );
}