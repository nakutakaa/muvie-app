import { useState } from "react";

function MovieCard({
  movie,
  isFavorite,
  onToggleFavorite,
  onAddReview,
  onUpdateLikes,
}) {
  const [reviewText, setReviewText] = useState("");

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (reviewText.trim()) {
      onAddReview(movie.id, reviewText);
      setReviewText("");
    }
  };

  return (
    <div className={`movie-card ${isFavorite ? "favorite" : ""}`}>
      <img src={movie.image} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <p>Origin: {movie.origin}</p>

      <div className="like-dislike">
        <button onClick={() => onUpdateLikes(movie.id, "likes")}>
          Like ({movie.likes})
        </button>
        <button onClick={() => onUpdateLikes(movie.id, "dislikes")}>
          Dislike ({movie.dislikes})
        </button>
        <button onClick={() => onToggleFavorite(movie.id)}>
          {isFavorite ? "★" : "☆"}
        </button>
      </div>

      <form className="review-form" onSubmit={handleSubmitReview}>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write a review..."
        />
        <button type="submit">Submit Review</button>
      </form>

      <div className="reviews">
        <h4>Reviews:</h4>
        {movie.reviews.length > 0 ? (
          movie.reviews.map((review, index) => (
            <div key={index} className="review">
              <p>{review}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
