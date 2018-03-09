import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
    render() {
      return (
        <div className="Navbar container">
         <ul>
            <li><a class="active" href="#home.html">Strona Główna</a></li>
            <li><a href="#list.html">Lista Boisk</a></li>
            <li><a href="#login.html">Logowanie</a></li>
         </ul>
        </div>
      );
    }
  }

  export default Navbar;

