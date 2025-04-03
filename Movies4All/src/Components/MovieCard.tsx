
import { Link } from "react-router-dom";
import { useMovieContext } from "../Contexts/MovieContext";
import "../css/MovieCard.css"

function MovieCard({movie}:any) {
    const {isFavorite, addToFavorites , removeFromFavorites} = useMovieContext() ; //to be able to use these context variables in this file
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e:any) {
       e.preventDefault();
       if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    
    return (
        <Link to={`/movie/${movie.id}`} className="movie-card"> 
        <div className="movie-card">
        <div className="movie-poster">
            <img src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} alt={movie.title}/>
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ♥
                </button>
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.split("-")[0]}</p>
        </div>
    </div>
    </Link>
    )
}

export default MovieCard;