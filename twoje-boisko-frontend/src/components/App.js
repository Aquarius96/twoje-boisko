import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import MainPage from '../pages/MainPage'
class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
        <Navbar />
          <Route exact path="/" component={MainPage} />
          
        </div>
      </Router>
    );
  }
}

export default App;
