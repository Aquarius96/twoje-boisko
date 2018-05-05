import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';
import LoginPage from '../pages/LoginPage.js';
import Navbar from './Navbar.js';
import MainPage from '../pages/MainPage.js';
import SportsfieldsListPage from '../pages/SportsfieldsListPage.js';
import MyProfilePage from '../pages/MyProfilePage.js';
import SingleObjectPage from '../pages/SingleObjectPage.js';
import ConfirmPage from '../pages/ConfirmPage.js';
import AdminPage from '../pages/AdminPage.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navbar/>
          <Route exact path="/" component ={MainPage}></Route>
          <Route path="/aktualnosci/:page" component={MainPage}/>
          <Route exact path="/listaBoisk" component={SportsfieldsListPage}/>
          <Route exact path="/listaBoisk/:page" component={SportsfieldsListPage}/>
          <Route exact path="/LoginPage" component={LoginPage}/>
          <Route exact path="/MyProfilePage" component={MyProfilePage}/>
          <Route path="/object/:id" component={SingleObjectPage}/>
          <Route path="/confirm/:id/:value" component={ConfirmPage}/>
          <Route exact path="/panelAdmina/:url/" component={AdminPage}/>          
          <Route exact path="/panelAdmina/:url/:page" component={AdminPage}/>
        </div>
      </Router>
    );
  }
}

export default App;
