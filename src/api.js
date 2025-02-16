import axios from "axios";

const API_KEY = process.env.REACT_APP_SECRET_APIKEY
const AUTH_TOKEN = process.env.REACT_APP_SECRET_KEY
export const API = axios.create({
  baseURL: "https://api.themoviedb.org/3", // Correct base URL for The Movie Database API
  headers: {
    accept: "application/json",
    Authorization:
      `Bearer ${AUTH_TOKEN}`, //
  },
});

// Use interceptors to attach the token dynamically to each request
API.interceptors.request.use((config) => {
  const token = API_KEY // This token key must be valid
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Example function to get movies
const getMovies = async () => {
  try {
    const response = await API.get("/movie/popular"); // Example endpoint for popular movies
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

// Call the function to fetch movies
getMovies();
