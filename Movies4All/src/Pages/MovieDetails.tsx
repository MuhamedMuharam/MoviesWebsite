import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getRelatedMovies } from "../services/api";
import '../css/MovieDetails.css'
import MovieCard from "../Components/MovieCard";

interface MovieDetailsType {
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  videos?: { results: { key: string; site: string; type: string }[] };
}

const MovieDetails = () => {
  const { movieId } = useParams<{ movieId: string }>(); // Get movie ID from URL
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [relatedMovies, setRelatedMovies] = useState<MovieDetailsType[]>([]); // State for related movies


  useEffect(() => {
    const fetchMovie = async () => {
      if (movieId) {
        const data = await getMovieDetails(Number(movieId));
        setMovie(data);

        const related = await getRelatedMovies(Number(movieId)); // Fetch related movies
          setRelatedMovies(related);
      }
    };
    fetchMovie();
  }, [movieId]);



  if (!movie) return <p>Loading...</p>;

  // Get YouTube Trailer (if available)
  const trailer = movie.videos?.results.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );

  return (
    <>
    <div className="movie-details">
      <img src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Rating:</strong> {movie.vote_average}/10</p>
      <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(", ")}</p>
      <p>{movie.overview}</p>
      {/* Display Trailer */}
      {trailer && (
        <div className="trailer">
          <h3>Watch Trailer</h3>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Movie Trailer"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Download Button */}
      <a
        href={`https://www.google.com/search?q=download+${encodeURIComponent(movie.title)}+movie`}
        target="_blank"
        rel="noopener noreferrer"
        className="download-btn"
      >
        Download Movie
      </a>
      </div>

      {/* Related Movies */}
      <div className="related-movies">
        <h3>Related Movies</h3>
        <div className="related-movies-grid">
          {relatedMovies.map((relatedMovie) => (
            <div key={relatedMovie.id} onClick={()=> window.scrollTo(0, 0)}>
            <MovieCard movie={relatedMovie} key={relatedMovie.id} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
