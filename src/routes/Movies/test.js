import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MoviesFilter from '../../components/movies/MoviesFilter'
import { DEFAULT_RATING } from '../../constants'
import { Movies, mapStateToProps } from './index'

Enzyme.configure({ adapter: new Adapter() })

const mockStore = {
  errors: { isError: false },
  genres: {
    250: { id: 250, name: 'genre foo' },
    251: { id: 251, name: 'genre bar' },
    240: { id: 240, name: 'genre foobar' }
  },
  movies: {
    data: {
      1: {
        id: 1,
        title: 'movie foo',
        voteAverage: 5,
        genreIds: [250, 251],
        posterPath: '/posterPath-1'
      },
      2: {
        id: 2,
        title: 'movie bar',
        voteAverage: 6,
        genreIds: [250],
        posterPath: '/posterPath-2'
      },
      3: {
        id: 3,
        title: 'movie foobar',
        voteAverage: 8,
        genreIds: [240],
        posterPath: '/posterPath-3'
      }
    }
  }
}

describe('route/Movies', () => {
  describe('#Movies', () => {
    let mockActions
    let mockProps

    beforeEach(() => {
      mockActions = {
        getCinemaListings: jest.fn()
      }

      mockProps = mapStateToProps(mockStore)
    })

    describe('matches snapshots', () => {
      it('when error', () => {
        const component = mount(<Movies {...mockActions} isError={true} />)
        expect(component).toMatchSnapshot()
      })

      it('when nothing in store', () => {
        const component = mount(<Movies {...mockActions} isError={false} movies={[]} genres={[]} />)
        expect(component).toMatchSnapshot()
      })

      it('when movies and genres in store', () => {
        const component = mount(<Movies {...mockActions} {...mockProps} />)
        expect(component).toMatchSnapshot()
      })

      describe('when filters set', () => {
        let component

        beforeEach(() => {
          component = mount(<Movies {...mockActions} {...mockProps} />)
        })

        it('rating selected', () => {
          component
            .setState({
              selectedRating: 7
            })

          expect(component).toMatchSnapshot()
        })

        it('single genre selected', () => {
          component
            .setState({
              selectedGenres: [250]
            })

          expect(component).toMatchSnapshot()
        })

        it('multiple genres selected', () => {
          component
            .setState({
              selectedGenres: [240, 251]
            })

          expect(component).toMatchSnapshot()
        })

        it('genres and rating selected', () => {
          component
            .setState({
              selectedGenres: [250],
              selectedRating: 5
            })

          expect(component).toMatchSnapshot()
        })
      })
    })

    describe('methods', () => {
      let component

      beforeEach(() => {
        component = mount(<Movies {...mockActions} {...mockProps} />)
      })

      describe('#constructor', () => {
        it('sets default state', () => {
          expect(component.state()).toEqual({
            selectedGenres: [],
            selectedRating: DEFAULT_RATING
          })
        })
      })

      describe('#updateSelectedGenres', () => {
        it('sets checked genre on callback', () => {
          component.setState({
            selectedGenres: []
          })


          component.find(MoviesFilter).props().onGenreChanged({
            target: {
              checked: true,
              value: 5
            }
          })
          expect(component.state().selectedGenres).toEqual([5])

          component.find(MoviesFilter).props().onGenreChanged({
            target: {
              checked: true,
              value: 10
            }
          })
          expect(component.state().selectedGenres).toEqual([5, 10])
        })

        it('unsets unchecked genre on callback', () => {
          component.setState({
            selectedGenres: [5, 10, 15]
          })

          component.find(MoviesFilter).props().onGenreChanged({
            target: {
              checked: false,
              value: 5
            }
          })
          expect(component.state().selectedGenres).toEqual([10, 15])

          component.find(MoviesFilter).props().onGenreChanged({
            target: {
              checked: false,
              value: 10
            }
          })
          expect(component.state().selectedGenres).toEqual([15])
        })
      })

      describe('#updateSelectedRating', () => {
        it('sets selected rating', () => {
          component.setState({
            selectedRating: 2
          })

          component.find(MoviesFilter).props().onRatingsChange({
            target: {
              value: 10
            }
          })
          expect(component.state().selectedRating).toEqual(10)

          component.find(MoviesFilter).props().onRatingsChange({
            target: {
              value: 5
            }
          })
          expect(component.state().selectedRating).toEqual(5)
        })
      })

      describe('#componentDidMount', () => {
        it('dispatched `getCinemaListings` action', () => {
          expect(mockActions.getCinemaListings).toHaveBeenCalled()
        })
      })
    })
  })
})
