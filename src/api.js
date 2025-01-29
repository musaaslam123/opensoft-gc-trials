import axios from "axios";

export const API = axios.create({
  baseURL: "https://api.themoviedb.org/3", // Correct base URL for The Movie Database API
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer SECRET_TOKEN", //
  },
});

// Use interceptors to attach the token dynamically to each request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("SECRET_APIKEY"); // This token key must be valid
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
