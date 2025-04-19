import MovieList from "./MovieList";

function Favorites({
  movies,
  onToggleFavorite,
  favorites,
  onAddReview,
  onUpdateLikes,
}) {
  return (
    <div>
      <h2>Your Favorite Movies</h2>
      {movies.length > 0 ? (
        <MovieList
          movies={movies}
          onToggleFavorite={onToggleFavorite}
          favorites={favorites}
          onAddReview={onAddReview}
          onUpdateLikes={onUpdateLikes}
        />
      ) : (
        <p>You haven't added any favorites yet.</p>
      )}
    </div>
  );
}

export default Favorites;
