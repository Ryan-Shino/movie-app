import { createContext, useState, useContext, useEffect} from "react"
import MoviePopup from "../components/MoviePopup"

// Context is used when we need to share global data, such as the current theme, a user or a preferred language
// Here we use it to keep some states that we want to share between the favourites and the home page
const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

// Provides state for any components wrapped in it
// By wrapping the entire app with this we can make it so that the entire app has access to some state that we define
// Children is a reserved prop that just means anything inside the component 
export const MovieProvider = ({children}) => {
    const [favourites, setFavourites] = useState([])
    const [watchlater, setWatchLater] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)

    const openMoviePopup = (movie) => setSelectedMovie(movie);
    const closeMoviePopup = () => setSelectedMovie(null);

    useEffect(() => {
        // Checking if there are any movies currently favourited
        const storedFavs = localStorage.getItem("favourites")

        // If there are movies that are stored and converts it back into an array from a string when we need it 
        if (storedFavs) setFavourites(JSON.parse(storedFavs))
    }, [])

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites))
    }, [favourites])

    const addToFavourites = (movie) => {
        setFavourites(prev => [...prev, movie])
    }

    const removeFromFavourites = (movieId) => {
        setFavourites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavourite = (movieId) => {
        return favourites.some(movie => movie.id === movieId)
    }

    useEffect(() => {
        const storedForLater = localStorage.getItem("watchlater")

        if (storedForLater) setWatchLater(JSON.parse(storedForLater))
    }, [])

    useEffect(() => {
        localStorage.setItem('watchlater', JSON.stringify(watchlater))
    }, [watchlater])

    const addToWatchLater = (movie) => {
        setWatchLater(prev => [...prev, movie])
    }

    const removeFromWatchLater = (movieId) => {
        setWatchLater(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isInWatchLater = (movieId) => {
        return watchlater.some(movie => movie.id === movieId)
    }

    const value = { 
        favourites,
        addToFavourites,
        removeFromFavourites,
        isFavourite,
        watchlater,
        addToWatchLater,
        removeFromWatchLater,
        isInWatchLater,
        openMoviePopup,
        closeMoviePopup,
        selectedMovie
    }

    return (
        <MovieContext.Provider value={{ 
            openMoviePopup,
            addToFavourites,
            removeFromFavourites,
            isFavourite,
            favourites,
            addToWatchLater,
            removeFromWatchLater,
            isInWatchLater,
            watchlater
            }}>
          {children}
          <MoviePopup movie={selectedMovie} onClose={closeMoviePopup} />
        </MovieContext.Provider>
    );
}