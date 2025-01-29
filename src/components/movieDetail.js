import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../api";
import Recommendations from "./recommendations";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");

  const fetchMovie = async () => {
    try {
      const res = await API.get(`/movies/${id}`);
      setMovie(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTrailer = async () => {
    try {
      const res = await API.get(`/movies/${id}/trailer`);
      setTrailerUrl(res.data.trailerUrl);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMovie();
    fetchTrailer();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
      <p className="mb-2">Genre: {movie.genre}</p>
      <p className="mb-4">{movie.description}</p>

      {trailerUrl && (
        <div className="mb-4">
          <video src={trailerUrl} controls className="w-full max-w-md" />
        </div>
      )}

      {/* Recommendations */}
      <Recommendations movieId={movie.id} />
    </div>
  );
}
