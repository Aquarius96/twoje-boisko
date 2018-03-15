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
        <div><p>Tu na razie jest ściernisko ale będzie twoje-boisko</p></div>
         <ul>
            <li><Link className='active' to="/">Strona Główna</Link></li>
            <li><Link to="/listaBoisk">Lista Boisk</Link></li>
            <li><a href="#login.html">Logowanie</a></li>
         </ul>
        </div>
      );
    }
  }

  export default Navbar;

