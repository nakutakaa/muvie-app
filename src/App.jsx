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
     // Fetch movies
     fetch("http://localhost:3001/movies")
       .then((response) => response.json())
       .then((data) => setMovies(data));

     // Fetch favorites
     fetch("http://localhost:3001/favorites")
       .then((response) => response.json())
       .then((data) => setFavorites(data));
   }, []);

   const filteredMovies = movies.filter((movie) =>
     movie.title.toLowerCase().includes(searchTerm.toLowerCase())
   );

   const addMovie = (newMovie) => {
     fetch("http://localhost:3001/movies", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(newMovie),
     })
       .then((response) => response.json())
       .then((data) => setMovies([...movies, data]));
   };

   const addReview = (movieId, review) => {
     const movieToUpdate = movies.find((movie) => movie.id === movieId);
     const updatedMovie = {
       ...movieToUpdate,
       reviews: [...movieToUpdate.reviews, review],
     };

     fetch(`http://localhost:3001/movies/${movieId}`, {
       method: "PUT",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(updatedMovie),
     }).then(() => {
       setMovies(
         movies.map((movie) => (movie.id === movieId ? updatedMovie : movie))
       );
     });
   };

   const updateLikes = (movieId, type) => {
     const movieToUpdate = movies.find((movie) => movie.id === movieId);
     const updatedMovie = {
       ...movieToUpdate,
       [type]: movieToUpdate[type] + 1,
     };

     fetch(`http://localhost:3001/movies/${movieId}`, {
       method: "PUT",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(updatedMovie),
     }).then(() => {
       setMovies(
         movies.map((movie) => (movie.id === movieId ? updatedMovie : movie))
       );
     });
   };

   const toggleFavorite = (movieId) => {
     let updatedFavorites;
     if (favorites.includes(movieId)) {
       updatedFavorites = favorites.filter((id) => id !== movieId);
     } else {
       updatedFavorites = [...favorites, movieId];
     }

     // Update favorites in db.json
     fetch("http://localhost:3001/favorites", {
       method: "PUT",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(updatedFavorites),
     }).then(() => setFavorites(updatedFavorites));
   };


  // useEffect(() => {
  //   fetch("/db.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setMovies(data.movies);
  //       setFavorites(data.favorites);
  //     });
  // }, []);

  // const filteredMovies = movies.filter((movie) =>
  //   movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const addMovie = (newMovie) => {
  //   setMovies([...movies, newMovie]);
  //   // In a real app, you would update db.json here
  // };

  // const addReview = (movieId, review) => {
  //   setMovies(
  //     movies.map((movie) =>
  //       movie.id === movieId
  //         ? { ...movie, reviews: [...movie.reviews, review] }
  //         : movie
  //     )
  //   );
  // };

  // const updateLikes = (movieId, type) => {
  //   setMovies(
  //     movies.map((movie) =>
  //       movie.id === movieId ? { ...movie, [type]: movie[type] + 1 } : movie
  //     )
  //   );
  // };

  // const toggleFavorite = (movieId) => {
  //   if (favorites.includes(movieId)) {
  //     setFavorites(favorites.filter((id) => id !== movieId));
  //   } else {
  //     setFavorites([...favorites, movieId]);
  //   }
  //   // In a real app, you would update db.json here
  // };

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
