function SearchBar({ setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search movies..."
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchBar;
