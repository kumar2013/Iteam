import React from 'react';

import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';

import notAvailableImg from '../assets/img/photo-not-available.png';

class Actor extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      actor: '',
      cast: ''
    };
  }
  
  static propTypes = {
      params: React.PropTypes.object
  };
  
  fetchActor() {
    const actorId = this.props.params.id;
    const url = 'https://api.themoviedb.org/3/person/'+ actorId +'?api_key=9618628fa1ffaa6ea5cbdc6f8f5a44d3&append_to_response=credits';
    
    fetch(url)
    .then((res) => res.json())
    .then((json) => {
      this.setState({
        actor: json
      });
    });
  }
  
  fetchActorsPopularMovie() {
    const actorId = this.props.params.id;
    const url = 'http://api.themoviedb.org/3/discover/movie?api_key=9618628fa1ffaa6ea5cbdc6f8f5a44d3&sort_by=popularity.desc&with_cast=' + actorId
    
    fetch(url)
    .then((res) => res.json())
    .then((json) => {
      this.setState({
        cast: json.results
      });
    });
  }
  
  componentDidMount() {
    document.body.scrollTop = 0;
    this.fetchActor();
    this.fetchActorsPopularMovie();
  }
  
  render() {
    const actor = this.state.actor;
    const cast = this.state.cast;
    
    let imgUrl = '';
    let moviesActed = '';
    
    let birthday = actor.birthday;
    let placeOfBirth = actor.place_of_birth;
    let biography = actor.biography;
    
    birthday = optimizeDetails(birthday);
    placeOfBirth = optimizeDetails(placeOfBirth);
    biography = optimizeDetails(biography);
    
    if (actor.profile_path === null || actor.profile_path === '' || actor.profile_path === undefined) {
      imgUrl = '../' + notAvailableImg;
    } else {
      imgUrl = 'http://image.tmdb.org/t/p/w500' + actor.profile_path;
    }
    
    if (cast) {
      moviesActed = cast.map((movie, index) => {
        if (index < 10) {
          return (
            <tr key={movie.id.toString()}>
              <td>{movie.original_title}</td>
              <td>{movie.release_date}</td>
            </tr>
          );
        }
      });
    }
    
    return (
      <div>
        <NavBar />
        <div id="it_actor_page">
          <div className="container">
            <div className="row">
              <div className="col-md-5 col-sm-6 col-xs-12">
                <img className="img-responsive" id={actor.id} src={imgUrl} />
              </div>
              <div className="col-md-7 col-sm-6 col-xs-12 it-actor-details">
                <h3>{actor.name}</h3>
                <p><span>Birthday: </span> {birthday}</p>
                <p><span>Place of Birth: </span> {placeOfBirth}</p>
                <p><span>Biography: </span>{biography}</p>
              </div>
            </div>
            <div className="row" id="it_actor_cast">
              <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">
                <h4>Popular Movies</h4>
                <table className="table table-responsive">
                  <thead>
                    <tr>
                      <th>Movie Name</th>
                      <th>Release Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {moviesActed}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

function optimizeDetails(data) {
  if (data === '' || data === null || data === undefined) {
    data = 'Not Available';
  }
  
  return data;
}

export default Actor