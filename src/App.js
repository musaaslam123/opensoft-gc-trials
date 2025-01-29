import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/header";
import Login from "./components/login";
import Register from "./components/register";
import MovieList from "./components/movielist";
import MovieDetail from "./components/movieDetail";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto py-4">
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
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
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
