import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Define Movie type
interface Movie {
  id: number;
  title: string;
  [key: string]: any; // Allows additional properties
}

// Define Context Type
interface MovieContextType {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

// Create Context with initial value as undefined
const MovieContext = createContext<MovieContextType | undefined>(undefined);

// Custom Hook to Use Context
export const useMovieContext = (): MovieContextType => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};

// Define Props Type for MovieProvider
interface MovieProviderProps {
  children: ReactNode;
}

// Movie Provider Component
export const MovieProvider = ({ children }: MovieProviderProps) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {  //used to display the available favourites movies
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) {
      setFavorites(JSON.parse(storedFavs) as Movie[]); // Ensure correct type casting
    }  //this line converts the Favourite movie from a JSON string of lists in the local storage to a real JSON Object
  }, []);

  useEffect(() => { //used to update the list of favourites saved in the local storage once any update occurs in the favourites list
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie: Movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFromFavorites = (movieId: number) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId: number): boolean => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const value: MovieContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};
