import React, { Component } from 'react';
import './Navbar.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class Navbar extends Component {
    render() {
      return (
        <div className="navbar container">
        <div><p>Twoje-boisko.pl</p></div>
         <ul>
            <li><Link class="active" to="/">Strona Główna</Link></li>
            <li><a href="#list.html">Lista Boisk</a></li>
            <li><a href="#login.html">Logowanie</a></li>
         </ul>
        </div>
      );
    }
  }

  export default Navbar;

