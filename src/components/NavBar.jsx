import React from 'react';
import { Link } from 'react-router';

class NavBar extends React.Component {
  render() {
    return(
      <nav className="navbar navbar-default navbar-fixed-top" id="it_navbar">
        <div className="container">
          <div className="navbar-header">
            <h4><Link to='/'>Movie Database</Link></h4>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar