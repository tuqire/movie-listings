import React from 'react'
import './index.css'

export default ({ movie }) =>
  <div className="movies-list-item">
    <h4>{movie.title}</h4>
    <h6 className="h6 text-muted small">Genres: {movie.genres.join(', ')}</h6>
    <img className="img-fluid mt-3" src={`${process.env.IMAGE_BASE_URL}/w500${movie.posterPath}`} alt={`poster for ${movie.title}`}/>
  </div>
