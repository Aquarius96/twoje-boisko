import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import MainPage from '../pages/MainPage';
import SportsfieldsListPage from '../pages/SportsfieldsListPage';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
        <Navbar />
          <Route exact path="/" component={MainPage} />
          <Route exact path="/listaBoisk" component={SportsfieldsListPage} />
        </div>
      </Router>
    );
  }
}

export default App;
