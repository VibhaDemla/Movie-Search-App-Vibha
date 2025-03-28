import { useState } from "react";
import axios from "axios";

const API_KEY = "ed9ae331"; // Your OMDb API Key

const App = () => {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    // Search movies from OMDb API
    const searchMovies = async () => {
        try {
            const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
            setMovies(response.data.Search || []);
            setSelectedMovie(null); // Reset details when searching
        } catch (error) {
            console.error("Error searching movies:", error);
        }
    };

    // Fetch detailed movie data
    const fetchMovieDetails = async (imdbID) => {
        try {
            const response = await axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
            setSelectedMovie(response.data);
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };

    return (
        <div className="container">
            <h1>🎬 Movie Search</h1>

            {/* Search Box */}
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Enter movie name..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={searchMovies}>🔍 Search</button>
            </div>

            {/* Show Movie Details if Selected */}
            {selectedMovie ? (
                <div className="movie-details">
                    <button className="back-btn" onClick={() => setSelectedMovie(null)}>⬅ Back to Search</button>
                    <h2>{selectedMovie.Title} ({selectedMovie.Year})</h2>
                    <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
                    <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
                    <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
                    <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
                    <p><strong>IMDB Rating:</strong> ⭐ {selectedMovie.imdbRating}</p>
                </div>
            ) : (
                // Movie Search Results
                <div className="movie-list">
                    {movies.map((movie) => (
                        <div key={movie.imdbID} className="movie-card" onClick={() => fetchMovieDetails(movie.imdbID)}>
                            <img src={movie.Poster} alt={movie.Title} />
                            <h3>{movie.Title}</h3>
                            <p>{movie.Year}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
