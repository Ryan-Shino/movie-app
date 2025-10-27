import "../css/WatchLater.css"
import { useMovieContext } from "../contexts/MovieContext"
import MovieCard from "../components/MovieCard"

function WatchLater() {
    const {watchlater} = useMovieContext();

    if (watchlater && watchlater.length > 0) {
        return (
            <div className = "watch-later">
                <div>
                    <h2>
                        Your watch list
                    </h2>
                </div>
                <div className="movies-grid">
                    {watchlater.map((movie) => (
                        <MovieCard movie={movie} key={movie.id}/>
                    ))}
                </div>
            </div>
        );
    }
    else{
        return (
        <div className="watch-later-empty">
            <h2>Nothing to watch yet</h2>
            <p>Start adding movies to your watch later and they will appear here!</p>
        </div>
        )
    }

}

export default WatchLater