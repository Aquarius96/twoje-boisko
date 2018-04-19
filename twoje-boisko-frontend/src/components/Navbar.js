import React, { Component } from 'react';
//import './Navbar.css';
import '../css/navbar.css';
import {
  Link
} from 'react-router-dom';

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state=({"loggedUser":{}});
  }
  
  componentDidMount(){
    try {
      this.setState({
        loggedUser:JSON.parse(localStorage.getItem('loggedUser'))
      });
    }
    catch(err) {
        console.log("error");
    }
  }
  logOut(){
    localStorage.setItem('isLoggedIn',false);
    localStorage.removeItem('loggedUser');
  }
    render() {
      if(localStorage.getItem('isLoggedIn') == "true"){
        if(this.state.loggedUser.id == 0){
          return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="logo">Tu na razie jest ściernisko ale będzie twoje-boisko</div>
             <ul class="navbar-nav mr-auto">
               <li class="nav-item"></li>
                <li class="nav-item"><Link className="a nav-link" to="/">Strona Główna</Link></li>
                <li class="nav-item"><Link className="a nav-link" to="/listaBoisk">Lista Boisk</Link></li>
                <li class="nav-item"><Link className="a nav-link" to="/MyProfilePage">Mój Profil</Link></li>
                <li class="nav-item"><Link className="a nav-link" to="/" onClick={this.logOut}>Wyloguj</Link> </li>
                <li class="nav-item"><Link className="a nav-link" to="/panelAdmina">Panel admina</Link> </li>
             </ul>
            </div>
            </nav>
          );
        }
        else{
          return (
            <div className="navbar">
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
        
      }
      else{
        return (
          <div className="navbar">
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

