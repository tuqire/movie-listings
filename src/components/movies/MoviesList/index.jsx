import React from 'react'
import MoviesListItem from './MoviesListItem'

export default props =>
  <div className="row">
    {props.movies.map(movie =>
      <div key={movie.id} className="col-6 col-md-4 col-lg-3 mt-5 mb-3">
        <MoviesListItem movie={movie} />
      </div>
    )}
  </div>
