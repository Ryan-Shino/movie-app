import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"
import React from "react";

function MovieCard({movie}){
    const {isFavourite, addToFavourites, removeFromFavourites, isInWatchLater, addToWatchLater, removeFromWatchLater} = useMovieContext()
    const { openMoviePopup } = useMovieContext();
    
    function onFavouriteClick(movie){
        if (isFavourite(movie.id)) removeFromFavourites(movie.id)
        else addToFavourites(movie)
    }
    
    function onWatchLaterClick(movie){
        if (isInWatchLater(movie.id)) removeFromWatchLater(movie.id)
        else addToWatchLater(movie)
    }

    return (
        <div className="movie-card">
          <div
            className="movie-poster"
            onClick={() => openMoviePopup(movie)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-overlay"></div>
            <div className="movie-buttons">
              <button
                className={`favourite-btn ${isFavourite(movie.id) ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation(); 
                  onFavouriteClick(movie);
                }}
              >
                ♥
              </button>
              <button
                className={`watch-later-btn ${isInWatchLater(movie.id) ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation(); 
                  onWatchLaterClick(movie);
                }}
              >
                🕑
              </button>
            </div>
          </div>
      
          <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.split("-")[0]}</p>
          </div>
        </div>
      );      
}

export default MovieCard
