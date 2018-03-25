import React, { Component } from 'react';
import './Navbar.css';
import {
  Link
} from 'react-router-dom';

class Navbar extends Component {
  constructor(props){
    super(props);
  }

  logOut(){
    localStorage.setItem('isLoggedIn',false);
    localStorage.setItem('loggedUser',{});
  }
    render() {
      if(localStorage.getItem('isLoggedIn') == "true"){
        return (
          <div className="navbar container">
          <div><p>Tu na razie jest ściernisko ale będzie twoje-boisko</p></div>
           <ul>
              <li><Link className='a' to="/">Strona Główna</Link></li>
              <li><Link to="/listaBoisk">Lista Boisk</Link></li>
              <li><Link to="/MyProfilePage">Mój Profil</Link></li>
              <li><Link to="/" onClick={this.logOut}>Wyloguj</Link> </li>
           </ul>
          </div>
        );
      }
      else{
        return (
          <div className="navbar container">
          <div><p>Tu na razie jest ściernisko ale będzie twoje-boisko</p></div>
           <ul>
              <li><Link className='a' to="/">Strona Główna</Link></li>
              <li><Link to="/listaBoisk">Lista Boisk</Link></li>
              <li><Link to="/LoginPage">Logowanie</Link></li>
           </ul>
          </div>
          
        );
      }
      
    }
  }

  export default Navbar;

