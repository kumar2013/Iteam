import React from 'react';
import { Link } from 'react-router';

import NavBar from '../components/NavBar.jsx';
import SearchBox from '../components/SearchBox.jsx';
import Footer from '../components/Footer.jsx';

import notAvailableImg from '../assets/img/not-available.png';

class Home extends React.Component {
  constructor(props) {
    super(props);
    
    this.state ={
      moviesList: []
    };
  }
  
  fetchMovieAPI(url) {
    fetch(url)
    .then((res) => res.json())
    .then((json) => {
      this.setState({
        moviesList: json.results
      });
    });
  }
  
  fetchRelevantMovies(searchKeyword) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=9618628fa1ffaa6ea5cbdc6f8f5a44d3&query=' + searchKeyword;
    
    this.fetchMovieAPI(url);
  }
  
  loadInitialData() {    
    const url = 'https://api.themoviedb.org/3/movie/popular?api_key=9618628fa1ffaa6ea5cbdc6f8f5a44d3&language=en-US';
    
    this.fetchMovieAPI(url);
  }
  
  componentDidMount() {
    this.loadInitialData();
  }
  
  render() {
    const moviesList = this.state.moviesList;
    let imgUrl = '';
    
    const movies = moviesList.map((movie) => {
      const movieId = '/movie/' + movie.id;
      
      if (movie.poster_path === null || movie.poster_path === '' || movie.poster_path === undefined) {
        imgUrl = notAvailableImg;
      } else {
        imgUrl = 'http://image.tmdb.org/t/p/w500' + movie.poster_path;
      }
      
      return (
        <li className="col-md-3 col-sm-6 col-xs-12 it-movie" key={movieId.toString()}>
          <Link to={movieId}>
            <img className="img-responsive" id={movie.id} src={imgUrl} />
          </Link>
        </li>
      );
    });
    
    return (
      <div>
        <NavBar />
        <SearchBox findMovies={this.fetchRelevantMovies.bind(this)}/>
        <div className="container" id="it-movies-list">
          <ul className="row">
            {movies}
          </ul>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home