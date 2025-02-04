import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/header";
import Login from "./components/login";
import Register from "./components/register";
import MovieList from "./components/movielist";
import MovieDetail from "./components/movieDetail";
import ProtectedRoute from "./components/protectedRoute";
import TrendingMovies from "./components/TrendingMovies";
import Popular from "./components/Popular";
import Upcoming from "./components/Upcoming";
import MovieDetails from './components/movieDetail';  // Create this component if it doesn't exist

function App() {
  return (
    <BrowserRouter>
      <div style={{ overflow: 'hidden', margin: 0, padding: 0 }}>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Example of a protected route if needed */}
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <div className="text-center mt-10">
                    <h1 className="text-xl font-bold">Protected Page</h1>
                  </div>
                </ProtectedRoute>
              }
            />

            <Route path="/trending" element={<TrendingMovies />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/upcoming" element={<Upcoming />} />

          </Routes>


        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
