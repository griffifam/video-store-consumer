import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Movie from './Movie';

import './MovieLibrary.css';

class MovieLibrary extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      buttonClassname: "movie__rent"
    };
  }

  componentDidMount() {
    this.getMovies()
  }

  getMovies = () => {
    axios.get('http://localhost:3000/movies')
    .then((response) => {
      this.setState({ movies: response.data });
    })
    .catch((error) => {
      this.setState({ error: error.message });
    });
  }

  // searchMovieLibrary = (searchTerm) => {
  //   axios.get(`http://localhost:3000/movies?query=<${searchTerm}>`)
  //   .then((response) => {
  //     this.setState({ movies: response.data });
  //   })
  //   .catch((error) => {
  //     this.setState({ error: error.message });
  //   });
  // }


  render() {
    const allMovies = this.state.movies.map((movie) => {
      return <Movie
        key={movie.id}
        id={movie.id}
        title={movie.title}
        overview={movie.overview}
        release_date={movie.release_date}
        image_url={movie.image_url}
        external_id={movie.external_id}/>
    });


    return (
      <div >

        <form className="search-bar" onSubmit={this.onFormSubmit}>
          <input
            type="text"
            placeholder="Search.."
            name="searchTerm"
            value={this.state.searchTerm}
            onChange={this.onInputChange}
          />
          <button type="submit" className="search-bar__submit"/>
        </form>

        <div className="library">
          {allMovies}
        </div>
      </div>
    )
  }
}

MovieLibrary.propTypes = {

};

export default MovieLibrary;