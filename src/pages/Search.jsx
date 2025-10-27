import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import { searchMovies, getGenres, getMoviePage } from "../services/api";
import "../css/Search.css"

function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [allMovies, setAllMovies] = useState([]);
    const [displayMovies, setDisplayMovies] = useState([]); 
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [randomMovie, setRandomMovie] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [availableGenres, setAvailableGenres] = useState([]);
    const [selectedGenreId, setSelectedGenreId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            try {
                const [movies, genres] = await Promise.all([
                    getMoviePage(1),
                    getGenres()
                ]);
                setAllMovies(movies);
                setDisplayMovies(movies);
                setAvailableGenres(genres);
                setCurrentPage(1);
                setHasMore(true);
                setError(null);
            } catch (err) {
                console.error("Failed to load initial data:", err);
                setError("Failed to load movies.");
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    const handleRandomMovie = () => {
        if (!allMovies || allMovies.length === 0) return;

        const randomIndex = Math.floor(Math.random() * allMovies.length);
        const pickedMovie = allMovies[randomIndex];

        setRandomMovie(pickedMovie);
        setShowFilters(false);
        setSelectedGenreId(null);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        
        setLoading(true);
        setRandomMovie(null);
        setShowFilters(false);
        setSelectedGenreId(null);
        try {
            const searchResults = await searchMovies(searchQuery);
            setDisplayMovies(searchResults);
            setError(null);
            setHasMore(false); 

        } catch (err) {
            console.error("Search failed:", err);
            setError("Failed to search...");
        } finally {
            setLoading(false);
        }

        setSearchQuery("");
    };

    const handleFilter = (genreName) => {
        setSearchQuery("");
        setRandomMovie(null);
        setHasMore(true); 

        const selectedGenre = availableGenres.find(
            g => g.name.toLowerCase() === genreName.toLowerCase()
        );

        if (!selectedGenre) {
            setDisplayMovies(allMovies);
            setSelectedGenreId(null);
            return;
        }

        const filteredMovies = allMovies.filter(movie =>
            movie.genre_ids.includes(selectedGenre.id)
        );

        setDisplayMovies(filteredMovies);
        setSelectedGenreId(selectedGenre.id);
    };

    const toggleFilterVisibility = () => {
        const filtersAreAboutToBeShown = !showFilters;

        setShowFilters(prev => !prev);
        
        if (filtersAreAboutToBeShown) {
            setDisplayMovies(allMovies);
            setRandomMovie(null);
            setSelectedGenreId(null);
            setSearchQuery(""); 
            setHasMore(true); 
        }
    };

    const showAllMovies = () => {
        setRandomMovie(null);
        setDisplayMovies(allMovies);
        setShowFilters(true);
        setSelectedGenreId(null);
    };

    const handleLoadMore = async () => {
        if (loadingMore || !hasMore) return;

        setLoadingMore(true);
        try {
            const nextPage = currentPage + 1;
            const newMovies = await getMoviePage(nextPage);
            
            if (newMovies.length === 0) {
                setHasMore(false);
            } else {
                const updatedMovies = [...allMovies, ...newMovies];
                setAllMovies(updatedMovies);
                
                // If no filter is active, show all movies
                if (!selectedGenreId) {
                    setDisplayMovies(updatedMovies);
                } else {
                    // Re-apply the current filter with new movies
                    const filteredMovies = updatedMovies.filter(movie =>
                        movie.genre_ids.includes(selectedGenreId)
                    );
                    setDisplayMovies(filteredMovies);
                }
                
                setCurrentPage(nextPage);
            }
        } catch (err) {
            console.error("Failed to load more movies:", err);
            setError("Failed to load more movies.");
        } finally {
            setLoadingMore(false);
        }
    };


    return (
        <div className="search">
            <div className="random-generator-area">
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text" 
                        placeholder="Search for Movies..." 
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="submit-btn">
                        Search
                    </button>
                </form>
                
                <div className="filter-area">
                    <button 
                        type="button"
                        className="filter-btn"
                        onClick={() => {
                            toggleFilterVisibility();
                        }}
                        disabled={loading}
                    >
                        Filters
                    </button>
                    {showFilters && (
                        <div className="filter-options-container">
                            {availableGenres.map(genre => (
                                <button 
                                    key={genre.id} 
                                    className={`filter-option ${selectedGenreId === genre.id ? 'active' : ''}`}
                                    onClick={() => handleFilter(genre.name)}
                                >
                                    {genre.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                
                {!showFilters && !randomMovie && (
                    <div> 
                        <h2>Don't know what you are looking for?</h2>
                        <p>Try our random movie generator</p>
                        <button 
                            type="button"
                            className="random-btn"
                            onClick={() => {
                                handleRandomMovie();
                            }}
                            disabled={loading || allMovies.length === 0}
                        >
                            Surprise me!
                        </button>
                    </div>
                )}
            </div>

            {loading && <div className="loading">Loading...</div>}
            
            {error && <div className="error">{error}</div>}

            {!loading && randomMovie && !showFilters ? (
                <div className="random-movie-display">
                    <h2>Your Random Pick:</h2>
                    <MovieCard movie={randomMovie} key={randomMovie.id}/>
                    <button 
                        onClick={() => {
                            showAllMovies();
                        }}
                        className="back-btn"
                    >
                        Back to Movies
                    </button>
                </div>
            ) : (
            !loading && displayMovies.length > 0 && (
                <div className="movie-loading">            
                    <div className="movies-grid">
                        {displayMovies.map((movie) => (
                            <MovieCard movie={movie} key={movie.id}/>
                        ))}
                    </div>
                    <button 
                        className="load-more-btn"
                        onClick={handleLoadMore}>
                        Load More
                    </button>
                </div>
                )
            )}
        </div>
    );
}

export default Search;