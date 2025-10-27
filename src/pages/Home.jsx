import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import { getPopularMovies } from "../services/api";
import { searchMovies } from "../services/api";
import "../css/Home.css"

function Home(){
    const[searchQuery, setSearchQuery] = useState("");
    //const[definesState, definesfunctiontoupdatestate]
    const[movies, setMovies] = useState([]);
    const[error, setError] = useState(null);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch(err) {
                console.log(err)
                setError("Failed to debug..")
            }
            finally {
                setLoading(false)
            }
        }

        loadPopularMovies()
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault()
        // Stops the search from going away after it is searched
        if (!searchQuery.trim()) return
        if (loading) return
        
        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Failed to search...")
        } finally {
            setLoading(false)
        }

        setSearchQuery("")
        // This sets the search bar to an empty string after search 
    }


    return (
    <div className="home">
        <div>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text" 
                    placeholder="Search for Movies..." 
                    className="search-input"

                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    //This is how you use the search bar and use it to update the page
                />
                <button type="submit" className="submit-btn">
                    Search
                </button>
            </form>
        </div>
        
        {error && <div className = "error-message">{error}</div>}

        {loading ? <div className = "loading">Loading...</div> : 
            <div className="movies-grid">
                {movies.map((movie) => (
                    //movie.title.toLowerCase().startsWith(searchQuery) && (
                    // This is called a conditional render as it will only show if it meets the condition
                    <MovieCard movie={movie} key={movie.id}/>
                ))}
            </div>
        }
    </div>
    )
}

export default Home