import React from 'react'

export default ({
  genres,
  onGenreChanged,
  selectedGenres,

  onRatingsChange,
  ratings,
  selectedRating }) =>
  <React.Fragment>
    <div className="mb-4">
      <strong className="d-block mb-2">Lowest rating:</strong>
      <select value={selectedRating} onChange={onRatingsChange}>
        {ratings.map(selectedRating =>
          <option value={selectedRating} key={selectedRating}>{selectedRating}</option>)}
      </select>
    </div>
    <strong className="d-block mb-2">Genres:</strong>
    <div className="row">
      {genres.map(genre => (
        <div key={genre.id} className="col-sm-6 col-4 col-lg-3">
          <label>
            <input
              className={`genre-checkbox-${genre.id} mr-2`}
              type="checkbox"
              value={genre.id}
              name={`genre-checkbox-${genre.id}`}
              checked={selectedGenres.indexOf(genre.id) > -1} onChange={onGenreChanged}
            />
            {genre.name}
          </label>
        </div>
      ))}
    </div>
  </React.Fragment>
