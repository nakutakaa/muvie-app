import { useState, useEffect } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import AddMovie from "./components/AddMovie";
import SearchBar from "./components/SearchBar";
import Favorites from "./components/Favorites";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.movies);
        setFavorites(data.favorites);
      });
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
    // In a real app, you would update db.json here
  };

  const addReview = (movieId, review) => {
    setMovies(
      movies.map((movie) =>
        movie.id === movieId
          ? { ...movie, reviews: [...movie.reviews, review] }
          : movie
      )
    );
  };

  const updateLikes = (movieId, type) => {
    setMovies(
      movies.map((movie) =>
        movie.id === movieId ? { ...movie, [type]: movie[type] + 1 } : movie
      )
    );
  };

  const toggleFavorite = (movieId) => {
    if (favorites.includes(movieId)) {
      setFavorites(favorites.filter((id) => id !== movieId));
    } else {
      setFavorites([...favorites, movieId]);
    }
    // In a real app, you would update db.json here
  };

  return (
    <div className="app">
      <h1>Movie Discovery App</h1>

      <div className="controls">
        <SearchBar setSearchTerm={setSearchTerm} />
        <button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? "Hide Form" : "Add Movie"}
        </button>
        <button onClick={() => setShowFavorites(!showFavorites)}>
          {showFavorites ? "Show All" : "Show Favorites"}
        </button>
      </div>

      {showAddForm && <AddMovie onAddMovie={addMovie} />}

      {showFavorites ? (
        <Favorites
          movies={movies.filter((movie) => favorites.includes(movie.id))}
          onToggleFavorite={toggleFavorite}
          favorites={favorites}
          onAddReview={addReview}
          onUpdateLikes={updateLikes}
        />
      ) : (
        <MovieList
          movies={filteredMovies}
          onToggleFavorite={toggleFavorite}
          favorites={favorites}
          onAddReview={addReview}
          onUpdateLikes={updateLikes}
        />
      )}
    </div>
  );
}

export default App;
