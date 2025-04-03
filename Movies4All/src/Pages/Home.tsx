import { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import "../css/Home.css";
import { getMoviesByCategory, searchMovies } from "../services/api";
import Fuse from "fuse.js";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(""); //state for any potential error while getting popular movies
  const [loading, setLoading] = useState(true); //state to store loading state of getting popular movies

  const [category, setCategory] = useState("popular"); // Default: Popular
  const [suggestions, setSuggestions] = useState([]); // State for search suggestions

  // Fetch movies based on the selected category
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const moviesData = await getMoviesByCategory(category);
        setMovies(moviesData);
        setError("");
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [category]); // Fetch movies whenever category changes

  // Handle search input and show suggestions
  const handleSearchInput = async (e: any) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
      setSuggestions([]); // Clear suggestions if the query is empty
      return;
    }

    // To avoid making a request while loading or when the query is too short
    if (loading) return;

    setLoading(true); // Show loading state

    try {
      // Call the API to get movies based on the search query
      const searchResults = await searchMovies(query);
      // Check if results are returned and set them as suggestions
      if (searchResults && searchResults.length > 0) {
        setSuggestions(searchResults); // Update suggestions with the API results
      } else {
        setSuggestions([]); // Clear suggestions if no results
      }
    } catch (err) {
      console.error("Error fetching search results", err);
      setSuggestions([]); // Clear suggestions if there's an error
    } finally {
      setLoading(false); // Hide loading state after the request
    }
  };

  const handleSearch = async (e: any) => {
    e.preventDefault(); // to keep the search word in the search bar after clicking the button
    if (!searchQuery.trim()) return; //to remove spaces from the written search keyword
    if (loading) return; // to avoid searching while loading

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      // Implement fuzzy search using Fuse.js
      const fuse = new Fuse(searchResults, {
        keys: ["title"], // Search in the title
        includeScore: true, // Optional: Include score to order by relevance
      });

      const fuzzyResults = fuse
        .search(searchQuery)
        .map((result) => result.item);

      setMovies(fuzzyResults);
      setError("");
      setSuggestions([]); // Clear suggestions after search
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false); //because loading ends , either success or failure
    }
    // setSearchQuery("");
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={handleSearchInput} //updating the state
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {/* Display search suggestions */}
      {suggestions.length > 0 && searchQuery && (
        <div className="suggestions-list">
          {suggestions.map((movie, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => setSearchQuery(movie.title)}
            >
              {movie.title}
            </div>
          ))}
        </div>
      )}

      {/* Sorting Buttons */}
      <div className="category-selector">
        <button
          className={category === "popular" ? "active" : ""}
          onClick={() => setCategory("popular")}
        >
          Popular
        </button>
        <button
          className={category === "top_rated" ? "active" : ""}
          onClick={() => setCategory("top_rated")}
        >
          Top Rated
        </button>
        <button
          className={category === "now_playing" ? "active" : ""}
          onClick={() => setCategory("now_playing")}
        >
          Now Playing
        </button>
      </div>

      {error && <div className="error-message">{error} </div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            //movie.title.toLowerCase().startsWith(searchQuery) && (
            <MovieCard movie={movie} key={movie.id} />
            //)
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
