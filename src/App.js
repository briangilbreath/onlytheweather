import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home.js';
import City from './pages/City.js';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/city/:id" component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
