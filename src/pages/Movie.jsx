import React from 'react';
import { Link } from 'react-router';

import numeral from 'numeral';
import _ from 'lodash';
import $ from 'jquery';

import notAvailableImg from '../assets/img/not-available.png';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

class Movie extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      movie: '',
      crew: '',
      cast: '',
      director: ''
    };
  }
  
  static propTypes = {
      params: React.PropTypes.object
  };
  
  fetchMovie() {
    const movieId = this.props.params.id;
    const url = 'https://api.themoviedb.org/3/movie/'+ movieId +'?api_key=9618628fa1ffaa6ea5cbdc6f8f5a44d3&append_to_response=credits';
    
    fetch(url)
    .then((res) => res.json())
    .then((json) => {
      this.setState({
        movie: json,
        crew: json.credits.crew,
        cast: json.credits.cast,
        director: _.find(json.credits.crew, {'job': 'Director'})
      });
    });
  }
  
  componentDidMount() {
    document.body.scrollTop = 0;
    this.fetchMovie();
  }
  
  render() {
    const noData        = 'Not Available';
    
    let movie           = this.state.movie;
    let crew            = this.state.crew;
    let cast            = this.state.cast;
    
    let imgUrl          = '';
    let bgImgUrl        = '';
    let bgStyle         = '';
    let actors          = '';
    let director        = noData;
    
    let genres          = movie.genres;
    let totalRevenue    = movie.revenue;
    let movieRunTime    = movie.runtime;
    
    let genresList      = nestedDataToString(genres);
    let productionList  = nestedDataToString(movie.production_companies);
    
    let writer          = _.filter(crew, {'job': 'Screenplay'});
    let musicDirector   = _.filter(crew, {'job': 'Original Music Composer'});
    
  
    if (movie.poster_path === null || movie.poster_path === '' || movie.poster_path === undefined) {
      imgUrl = '../' + notAvailableImg;
    } else {
      imgUrl = 'http://image.tmdb.org/t/p/w500' + movie.poster_path;
    }
    
    if (movie.backdrop_path === null || movie.backdrop_path === '' || movie.backdrop_path === undefined) {
      bgStyle = {
        background: '#fff'
      };
    } else {
      bgImgUrl ='http://image.tmdb.org/t/p/original' + movie.backdrop_path;
      bgStyle = {
        backgroundImage: 'url(' + bgImgUrl + ')'
      };
    }
    
    if (this.state.director) {
      director = this.state.director.name;
    }
    
    if (genresList === '') {
      genresList = noData;
    }
    
    if (totalRevenue === 'undefined' || totalRevenue === 0) {
      totalRevenue = noData;
    } else {
      totalRevenue = numeral(movie.revenue).format('($0,0)');
    }
    
    if (movieRunTime === 0 || movieRunTime === '' || movieRunTime === undefined) {
      movieRunTime = noData;
    } else {
      movieRunTime += 'mins';
    }
     
    if (productionList == '') {
      productionList = optimizeDetails(crew, productionList, 'Producer');
    }
    
    writer = optimizeDetails(crew, writer, 'Writer');
    musicDirector = optimizeDetails(crew, musicDirector, 'Music');
 
    if (cast) {
      actors = cast.map((actor) => {
        const actorId = '/actor/' + actor.id;

        return (
          <li className="col-md-3 col-sm-4 col-xs-12" key={actorId.toString()}>
            <Link to={actorId}>
              {actor.name}
            </Link>
          </li>
        );
      });
    }
    
    return (
      <div>
        <NavBar />
        <div id="it_movie_page">
          <div className="container">
            <div className="row">
              <div className="col-md-5 col-sm-6 col-xs-12">
                <img className="img-responsive" id={movie.id} src={imgUrl} />
              </div>
              <div className="col-md-7 col-sm-6 col-xs-12 it-movie-details">
                <h3>{movie.title}</h3>
                <p className="it-movie-tagline">{movie.tagline}</p>
                <p className="it-movie-overview">{movie.overview}</p>
                <p><span>Director:</span> {director}</p>
                <p><span>Writers:</span> {writer}</p>
                <p><span>Music:</span> {musicDirector}</p>
                <p><span>Genre:</span> {genresList}</p>
                <p><span>Release Date:</span> {movie.release_date}</p>
                <p><span>Box Office:</span> {totalRevenue}</p>
                <p><span>Running time:</span> {movieRunTime}</p>
                <p><span>Produced by:</span> {productionList}</p>
                <p><span>Ratings:</span> {movie.vote_average} / 10</p>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row" id="it_movie_cast" style={bgStyle}>
              <div className="it-bg-wrapper">
                <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">
                  <h4>Cast</h4>
                  <ul className="row">
                    {actors}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

function optimizeDetails(crew, technician, jobTitle) {
  let result = 'Not Available';
  let person = technician;

  if (person.length === 0) {
    person = _.filter(crew, {'job': jobTitle});

    if (person.length === 0) {
      return result;
    } 
  } 
  
  if (person.length === 1) {
    result = person[0].name;
  } else {
    result = nestedDataToString(person);
  }
  
  return result;
}

function nestedDataToString(nestedData) {
  let nestedArray = [];
  let resultString;
  
  $.each(nestedData, function(i, item) {
    nestedArray.push(item.name);
  });
  
  resultString = nestedArray.join(', ');
  return resultString;
}

export default Movie
