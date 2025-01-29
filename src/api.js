import axios from "axios";

export const API = axios.create({
  baseURL: "https://api.themoviedb.org/3", // Correct base URL for The Movie Database API
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjc2ZGRhMTk4Y2M2NjM2NGY3NjQxNWY4NWFhZWRiMCIsIm5iZiI6MTczNzgwNTIzNS4xNSwic3ViIjoiNjc5NGNkYjNiNTAwZmM3Y2EzMTgzYTFiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cpbrC9ntaBa1dgMaD-Dl_aShCDb0H1kMwfZnvvBbIHQ",
  },
});

// Use interceptors to attach the token dynamically to each request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("2b76dda198cc66364f76415f85aaedb0"); // This token key must be valid
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
