import React from 'react';
import bgImg from '../assets/img/home-bg-cover.png';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      keyword: ''
    };
  }
  
  static propTypes = {
    findMovies: React.PropTypes.func
  };
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.findMovies(this.state.keyword);
  }
  
  handleChange(e) {
    this.setState({
      keyword: e.target.value
    });
  }
  
  render() {
    let bgStyle = {
      backgroundImage: 'url('+ bgImg +')'
    };
    
    return (
      <div id="it_searchbox" style={bgStyle}>
        <form className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="search">Search</label>
            <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Type here"></input>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBox
