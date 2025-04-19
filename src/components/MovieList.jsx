import MovieCard from "./MovieCard";

function MovieList({
  movies,
  onToggleFavorite,
  favorites,
  onAddReview,
  onUpdateLikes,
}) {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={favorites.includes(movie.id)}
          onToggleFavorite={onToggleFavorite}
          onAddReview={onAddReview}
          onUpdateLikes={onUpdateLikes}
        />
      ))}
    </div>
  );
}

export default MovieList;
