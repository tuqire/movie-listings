import React from 'react'
import { connect } from 'react-redux'
import MoviesFilter from '../../components/movies/MoviesFilter'
import MoviesList from '../../components/movies/MoviesList'
import arrayIncludesAll from '../../helpers/arrayIncludesAll'
import { getCinemaListings } from '../../store/action-creators'
import { DEFAULT_RATING } from '../../constants'

const ratings = Array.apply(null, Array(20)).map((v, i) => i * 0.5 + 0.5)

export class Movies extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedGenres: [],
      selectedRating: DEFAULT_RATING
    }

    this.updateSelectedGenres = this.updateSelectedGenres.bind(this)
    this.updateSelectedRating = this.updateSelectedRating.bind(this)
  }

  updateSelectedGenres(event) {
    const genreIdClicked = Number(event.target.value)

    if (event.target.checked) {
      this.setState({
        selectedGenres: [
          ...this.state.selectedGenres,
          genreIdClicked
        ]
      })
    } else {
      this.setState({
        selectedGenres: this.state.selectedGenres.filter(genreId => genreId !== genreIdClicked)
      })
    }
  }

  updateSelectedRating(event) {
    const newRating = Number(event.target.value)

    this.setState({
      selectedRating: newRating
    })
  }

  componentDidMount() {
    this.props.getCinemaListings()
  }

  render() {
    if (this.props.isError) {
      return <h4>Error Occurred</h4>
    }

    const filteredMovies = this.props.movies.filter(movie =>
      movie.voteAverage >= this.state.selectedRating &&
      arrayIncludesAll(this.state.selectedGenres, movie.genreIds)
    )

    return (
      <div>
        <h1 className="mb-4">Movies On Cinema Now</h1>
        <MoviesFilter
          genres={this.props.genres}
          onGenreChanged={this.updateSelectedGenres}
          selectedGenres={this.state.selectedGenres}

          ratings={ratings}
          onRatingsChange={this.updateSelectedRating}
          selectedRating={this.state.selectedRating}
          />
        <MoviesList movies={filteredMovies} />
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  isError: state.errors.isError,
  genres: Object.values(state.genres),
  movies: Object.values(state.movies.data).map(movie => {
    const newMovie = { ...movie }

    newMovie.genres = movie.genreIds.map(genreId => state.genres[genreId] ? state.genres[genreId].name : '')

    return newMovie
  })
})

const mapDispatchToProps = {
  getCinemaListings
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies) 
