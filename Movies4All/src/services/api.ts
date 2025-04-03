const API_KEY = "a387d1a387d27f781c1d2aab72e937de";
const BASE_URL = "https://api.themoviedb.org/3";


export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  };
  
  export const searchMovies = async (query: any) => {
    const response = await fetch(
       `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    console.log(data);
    return data.results;
  };

  export const getMovieDetails = async (movieId: number) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`);
    const data = await response.json();
    return data;
};

export const getMoviesByCategory = async (category: string) => {
  const response = await fetch(`${BASE_URL}/movie/${category}?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};



export const getRelatedMovies = async (movieId: number) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};





