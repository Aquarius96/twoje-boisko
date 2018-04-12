import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import LoginPage from '../pages/LoginPage.js';
import './App.css';
import Navbar from './Navbar.js';
import MainPage from '../pages/MainPage.js';
import SportsfieldsListPage from '../pages/SportsfieldsListPage.js';
import MyProfilePage from '../pages/MyProfilePage.js';
import SingleObjectPage from '../pages/SingleObjectPage';
import ConfirmPage from '../pages/ConfirmPage';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
        <Navbar />
          <Route exact path="/" component={MainPage} />
          <Route exact path="/listaBoisk" component={SportsfieldsListPage} />
          <Route exact path="/LoginPage" component={LoginPage} />
          <Route exact path="/MyProfilePage" component={MyProfilePage} />
          <Route path="/object/:id" component={SingleObjectPage}/>
          <Route path ="/confirm/:id/:value" component={ConfirmPage}/>
        </div>
      </Router>
    );
  }
}

export default App;
