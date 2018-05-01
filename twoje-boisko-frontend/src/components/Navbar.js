import React, {Component} from 'react';
//import './Navbar.css';
import '../css/navbar.css';
import {Link} from 'react-router-dom';
import Spinner from './Spinner';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = ({loggedUser: {}, dataCollected: false});
    this.showMenu = this
      .showMenu
      .bind(this);
  }

  componentDidMount() {
    var user = localStorage.getItem('loggedUser');
    if (user) {
      this.setState({
        loggedUser: JSON.parse(user),
        dataCollected: true
      });
    }
  }

  shouldComponentUpdate() {
    var user = localStorage.getItem('loggedUser');
    if (user) {
      if (JSON.parse(user).id != this.state.loggedUser.id) {
        return true;
      }
    }
  }
  componentDidUpdate() {
    var user = localStorage.getItem('loggedUser');
    if (user) {
      this.setState({
        loggedUser: JSON.parse(user),
        dataCollected: true
      });
    }
  }

  logOut() {
    localStorage.setItem('isLoggedIn', false);
    localStorage.removeItem('loggedUser');
    this.setState({loggedUser: {}});
    //this.forceUpdate();
  }
  showMenu() {
    document
      .getElementById("myDropdown")
      .classList
      .toggle("show");
  }
  render() {
    if (this.state.dataCollected) {
      if (this.state.loggedUser.id == 0) {
        return (
          <nav className="navbar navbar-expand-lg navbar-custom">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="logo">Tu na razie jest ściernisko ale będzie twoje-boisko</div>
            </div>
            <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item"></li>
                <li class="nav-item">
                  <Link className="a nav-link" to="/">
                    <i class="fas fa-home"></i>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link className="a nav-link" to="/listaBoisk">Lista Boisk</Link>
                </li>
                <li class="nav-item">
                  <Link className="a nav-link" to="/MyProfilePage">Mój Profil</Link>
                </li>
                <li class="nav-item" onMouseEnter ={this.showMenu} onMouseLeave={this.showMenu}>
                  <div class="dropdown">
                    <div className="dropbtn a nav-link">Panel admina</div>
                    <div id="myDropdown" class="dropdown-content">
                      <Link className="a nav-link nav-link-dropdown" to="/panelAdmina/obiekty/1">Obiekty</Link>
                      <Link className="a nav-link nav-link-dropdown" to="/panelAdmina/aktualnosci/1">Aktualności</Link>
                      <Link className="a nav-link nav-link-dropdown" to="/panelAdmina/uzytkownicy/1">Użytkownicy</Link>
                    </div>
                  </div>
                </li>
                <li class="nav-item">
                  <Link className="a nav-link" to="/" onClick={this.logOut}>
                    <i title="Wyloguj się" class="fas fa-power-off"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        );
      } else {
        return (

          <nav class="navbar navbar-expand-lg navbar-custom">
            <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
              <div className="logo">Tu na razie jest ściernisko ale będzie twoje-boisko</div>
            </div>
            <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item"></li>
                <li class="nav-item">
                  <Link className="a nav-link" to="/">Strona Główna</Link>
                </li>
                <li class="nav-item">
                  <Link className="a nav-link" to="/listaBoisk">Lista Boisk</Link>
                </li>
                <li class="nav-item">
                  <Link className="a nav-link" to="/MyProfilePage">Mój Profil</Link>
                </li>
                <li class="nav-item">
                  <Link className="a nav-link" to="/" onClick={this.logOut}>
                    <i title="Wyloguj się" class="fas fa-power-off"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

        );
      }

    } else {
      return (

        <nav class="navbar navbar-expand-lg navbar-custom">
          <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
            <div className="logo">Tu na razie jest ściernisko ale będzie twoje-boisko</div>
          </div>
          <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item"></li>
              <li class="nav-item">
                <Link className="a nav-link" to="/">Strona Główna</Link>
              </li>
              <li class="nav-item">
                <Link className="a nav-link" to="/listaBoisk">Lista Boisk</Link>
              </li>
              <li class="nav-item">
                <Link className="a nav-link" to="/LoginPage">Logowanie</Link>
              </li>
              <li class="nav-item" onMouseEnter ={this.showMenu} onMouseLeave={this.showMenu}>
                  <div class="dropdown">
                    <div className="dropbtn a nav-link">Panel admina</div>
                    <div id="myDropdown" class="dropdown-content">
                      <Link className="a nav-link nav-link-dropdown" to="/panelAdmina/obiekty/1">Obiekty</Link>
                      <Link className="a nav-link nav-link-dropdown" to="/panelAdmina/aktualnosci/1">Aktualności</Link>
                      <Link className="a nav-link nav-link-dropdown" to="/panelAdmina/uzytkownicy/1">Użytkownicy</Link>
                    </div>
                  </div>
                </li>
            </ul>
          </div>
        </nav>
      );
    }
    //else return <Spinner />

  }
}

export default Navbar;