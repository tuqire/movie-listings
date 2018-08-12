import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MoviesList from './index'

Enzyme.configure({ adapter: new Adapter() })

const mockProps = {
  movies: [{
      id: 1,
      genres: ['foo genre', 'bar genre'],
      title: 'movie foo',
      voteAverage: 5,
      genreIds: [250, 251],
      posterPath: '/posterPath-1'
    }, {
      id: 2,
      genres: ['bar genre'],
      title: 'movie bar',
      voteAverage: 6,
      genreIds: [250],
      posterPath: '/posterPath-2'
    }, {
      id: 3,
      genres: ['bar genre', 'foobar genre'],
      title: 'movie foobar',
      voteAverage: 8,
      genreIds: [240],
      posterPath: '/posterPath-3'
    }
  ]
}

describe('components/movies/MoviesList', () => {
  describe('#MoviesList', () => {
    describe('matches snapshots', () => {
      it('when nothing in store', () => {
        const component = mount(<MoviesList movies={[]} />)
        expect(component).toMatchSnapshot()
      })

      it('when movies in store', () => {
        const component = mount(<MoviesList {...mockProps} />)
        expect(component).toMatchSnapshot()
      })
    })
  })
})
