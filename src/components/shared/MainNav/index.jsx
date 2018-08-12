import React from 'react'
import { Link } from 'react-router-dom'

export default () =>
  <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
      <li className="nav-item"><Link className="nav-link" to="/movies">Cinema Listings</Link></li>
    </ul>
  </nav>
