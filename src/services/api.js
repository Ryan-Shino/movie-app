const API_KEY = "e542bcddeb6b77d7979619f0b2c58d55"
const BASE_URL = "https://api.themoviedb.org/3"

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json()
    return data.results
};

export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json()
    return data.results
};

export const getGenres = async () => {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    const data = await response.json()
    return data.genres
};

export const getMovieList = async (maxPages = 20) => {
    let allMovies = [];

    for (let page = 1; page <= maxPages; page++) {
      const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}`
      );
      const data = await response.json();
  
      if (data.results) {
        allMovies = [...allMovies, ...data.results];
      }
  
      if (page >= data.total_pages) break;
    }
  
    return allMovies;
};

export const getMoviePage = async (page = 1) => {
    const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}`
    );
    const data = await response.json();
    return data.results || [];
};