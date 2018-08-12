import React from 'react'
import { Link } from 'react-router-dom'

export default () =>
  <div>
    <h1>Welcome to Tuqire's demo movie app</h1>
    <p><Link className="btn btn-primary mt-3" to="/movies">View Cinema Listings</Link></p>
  </div>
