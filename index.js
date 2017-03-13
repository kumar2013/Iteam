import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Style from './src/assets/styles/style.scss';
import Home from './src/pages/Home';
import Movie from './src/pages/Movie';
import Actor from './src/pages/Actor';


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Home}></Route>
    <Route path="/movie/:id" name="movie" component={Movie}></Route>
    <Route path="/actor/:id" name="actor" component={Actor}></Route>
  </Router>,
  document.getElementById('app')
);