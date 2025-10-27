import React from "react";
import "../css/MoviePopup.css"
import { getGenres } from '../services/api';
import { useEffect, useState } from "react";

function MoviePopup({movie, onClose}) {
    const [genreList, setGenreList] = useState([]);

    useEffect(() => {
      const fetchGenres = async () => {
        const genres = await getGenres();
        setGenreList(genres);
      };
      fetchGenres();
    }, []);
    if (!movie) return null;

    return(
    <div className="movie-popup-overlay" onClick={onClose}>
        <div
        className="movie-popup"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
        onClick={(e) => e.stopPropagation()}
        >
        <button className="close-btn" onClick={onClose}>✕</button>
        <div className="movie-info-column">
            <h2>{movie.title}</h2>
            <div className="extra-info">
            {movie.release_date?.split("-")[0]} • ⭐ {movie.vote_average}
            </div>
            <div className="movie-genres">
                {movie.genre_ids?.map((id) => {
                    const genre = genreList.find(g => g.id === id);
                    return genre ? <span key={id}>{genre.name}</span> : null;
                })}
            </div>
            <p>{movie.overview}</p>
        </div>
        </div>
    </div>
    );
}

export default MoviePopup