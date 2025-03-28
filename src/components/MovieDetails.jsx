import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/movie?id=${id}`).then((res) => {
            setMovie(res.data);
        });
    }, [id]);

    if (!movie) return <h2>Loading...</h2>;

    return (
        <div className="details">
            <h2>{movie.Title} ({movie.Year})</h2>
            <img src={movie.Poster} alt={movie.Title} />
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
        </div>
    );
};

export default MovieDetails;
