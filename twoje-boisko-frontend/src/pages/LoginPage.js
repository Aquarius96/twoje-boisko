import React, { Component } from 'react';

class LoginPage extends Component {
  constructor(props){
    super(props);
    this.addUser=this.addUser.bind(this);
  }
  addUser(){
    fetch('http://localhost:8080/logowanie', {
      method: 'POST',
      mode:'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: 'Isard',
        password: 'Haslo123',
      })
    }).then(result => {
        console.log(result.json());
    })
  }
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
                <button onClick={this.addUser}class ="mybutton" type="submit">Zaloguj</button>
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
