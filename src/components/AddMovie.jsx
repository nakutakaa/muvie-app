import { useState } from "react";

function AddMovie({ onAddMovie }) {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    origin: "",
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== "admin123") {
      // Change this to your desired password
      setError("Incorrect password");
      return;
    }

    const newMovie = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      reviews: [],
      likes: 0,
      dislikes: 0,
    };

    onAddMovie(newMovie);
    setFormData({
      title: "",
      image: "",
      description: "",
      origin: "",
    });
    setPassword("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-movie-form">
      <h2>Add New Movie</h2>

      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Image URL:</label>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Origin:</label>
        <input
          type="text"
          name="origin"
          value={formData.origin}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
      </div>

      <button type="submit">Add Movie</button>
    </form>
  );
}

export default AddMovie;
