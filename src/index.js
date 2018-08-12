import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import Home from './routes/Home'
import Movies from './routes/Movies'

import MainNav from './components/shared/MainNav'

import createStore from './store'

const store = createStore()

const App = () => 
  <Provider store={store}>
    <HashRouter>
      <div className="container">
        <MainNav />
        <Route exact path="/" component={Home} />
        <Route path="/movies" component={Movies} />
      </div>
    </HashRouter>
  </Provider>

ReactDOM.render(<App />, document.getElementById('root'))
