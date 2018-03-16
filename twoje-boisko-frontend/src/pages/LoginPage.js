import React, { Component } from 'react';

class LoginPage extends Component {
  render() {
    return (
      <div className="LoginPage container">
      
        <div class="container">

          <div class="row">

            <div class ="column">
              <center>
                <h2>Logowanie</h2>
                <input type="text" id="myInput2" placeholder="Wpisz login..." name="uname" required></input>
                <br />
                <input type="password" id="myInput2" placeholder="Wpisz haslo..." name="psw" required></input>
                <br />
                <button class ="mybutton" type="submit">Zaloguj</button>
              </center>
            </div>
    
          <div class ="column">
            <center>
            <h2>Rejestracja</h2>
            <input type="text" id="myInput2" placeholder="Wpisz login..." name="uname" required></input>
            <br />
            <input type="password" id="myInput2" placeholder="Wpisz haslo..." name="psw" required></input>
            <br />
            <input type="password" id="myInput2" placeholder="Powtorz haslo..." name="psw2" required></input>
            <br />
            <input type="text" id="myInput2" placeholder="Wpisz e-mail..." name="email" required></input>
            <br />
            <input type="text" id="myInput2" placeholder="Wpisz numer telefonu..." name="tel" ></input>
            <br />
            <button class ="mybutton" type="submit">Zarejestruj</button>
            </center>
        
          </div>
        </div>
      </div>
    </div>
    );
  }
}
export default LoginPage;
