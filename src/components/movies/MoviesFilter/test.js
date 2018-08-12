import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MoviesFilter from './index'

Enzyme.configure({ adapter: new Adapter() })

const mockProps = {
  genres: [
    { id: 250, name: 'genre foo' },
    { id: 251, name: 'genre bar' },
    { id: 240, name: 'genre foobar' }
  ],
  onGenreChanged: jest.fn(),
  selectedGenres: [],
  onRatingsChange: jest.fn(),
  ratings: [1, 2, 3, 4, 5],
  selectedRating: 1
}

describe('components/movies/MoviesFilter', () => {
  describe('#MoviesFilter', () => {
    describe('matches snapshots', () => {
      it('when nothing in store', () => {
        const component = mount(<MoviesFilter {...mockProps} genres={[]} />)
        expect(component).toMatchSnapshot()
      })

      it('when genres in store', () => {
        const component = mount(<MoviesFilter {...mockProps} />)
        expect(component).toMatchSnapshot()
      })

      it('when selected genres in store', () => {
        const component = mount(<MoviesFilter {...mockProps} selectedGenres={[240, 251]} />)
        expect(component).toMatchSnapshot()
      })
    })

    describe('props', () => {
      let component

      beforeEach(() => {
        component = mount(<MoviesFilter {...mockProps} />)
      })

      describe('#onGenreChanged', () => {
        it('called when genre selected / unselected', () => {
          expect(mockProps.onGenreChanged).not.toHaveBeenCalled()

          component.find('.genre-checkbox-250').simulate('change', { foo: true })

          expect(mockProps.onGenreChanged).toHaveBeenCalledTimes(1)
          expect(mockProps.onGenreChanged).toHaveBeenCalledWith(expect.objectContaining({ foo: true }))
        })
      })

      describe('#onRatingsChange', () => {
        it('called when genre selected / unselected', () => {
          expect(mockProps.onGenreChanged).not.toHaveBeenCalled()

          component.find('select').simulate('change', { foo: true })

          expect(mockProps.onRatingsChange).toHaveBeenCalledTimes(1)
          expect(mockProps.onRatingsChange).toHaveBeenCalledWith(expect.objectContaining({ foo: true }))
        })
      })
    })
  })
})
