import axios from "axios";

const API_KEY = process.env.REACT_APP_SECRET_APIKEY
const AUTH_TOKEN = process.env.REACT_APP_SECRET_KEY
export const API = axios.create({
  baseURL: "https://api.themoviedb.org/3", // Correct base URL for The Movie Database API
  headers: {
    accept: "application/json",
    Authorization:
<<<<<<< HEAD
      "Bearer SECRET_TOKEN", //
=======
      `Bearer ${AUTH_TOKEN}`, //
>>>>>>> 91edd3eb0555b50fed21feffcc5da7abc51c2c7f
  },
});

// Use interceptors to attach the token dynamically to each request
API.interceptors.request.use((config) => {
<<<<<<< HEAD
  const token = localStorage.getItem("SECRET_APIKEY"); // This token key must be valid
=======
  const token = API_KEY // This token key must be valid
>>>>>>> 91edd3eb0555b50fed21feffcc5da7abc51c2c7f
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
