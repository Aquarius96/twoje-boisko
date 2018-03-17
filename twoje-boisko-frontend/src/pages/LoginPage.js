import React, { Component } from 'react';
import './LoginPage.css';
import $ from 'jquery'

class LoginPage extends Component {

  constructor(props)
  {
    super(props);
    this.switchwindows = this.switchwindows.bind(this);
  }

  switchwindows()
  {
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
  }

  render() {
    return (
      <div className="LoginPage container">

          <div class="login-page">

            <div class="form">

              <form class="register-form">
                
                <h1>Rejestracja</h1>
                <input type="text" placeholder="Login...*" required/>
                <input type="password" placeholder="Hasło...*" required/>
                <input type="password" placeholder="Powtórz hasło...*" required/>
                <input type="text" placeholder="E-mail...*" required/>
                <input type="text" placeholder="Imie..."/>
                <input type="text" placeholder="Nazwisko..."/>
                <input type="text" placeholder="Numer telefonu..."/>
                <button>Stwórz konto</button>
                <p class="message">Jesteś już zarejestrowany? <a onClick = {this.switchwindows}>Zaloguj się!</a></p>
                <p class="message">Pola oznaczone * są obowiązkowe</p>
              </form>
              
              <form class="login-form">
              
                <h1>Logowanie</h1>
                <input type="text" placeholder="Login..." required/>
                <input type="password" placeholder="Hasło..." required/>
                <button>Zaloguj</button>
                <p class="message">Nie masz konta? <a onClick = {this.switchwindows}>Zarejestruj się!</a></p>
              
              </form>
            
            </div>
          
          </div>  
    
    </div>
    );
  }
}
export default LoginPage;
