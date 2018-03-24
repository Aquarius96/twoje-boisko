import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './LoginPage.css';
import $ from 'jquery';

class LoginPage extends Component {

  constructor(props)
  {
    super(props);
    this.state=({login:"",password:"",email:"",firstname:"",lastname:"",phone:""});
    this.switchwindows = this.switchwindows.bind(this);
    this.login=this.login.bind(this);
    this.register=this.register.bind(this);
    this.saveUserData=this.saveUserData.bind(this);
    console.log(this.state.login);
  }

  

  switchwindows()
  {
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
  }

  updateInputValue(evt,x){
    switch(x){
      case 1:
      this.setState({
        login: evt.target.value 
      });
      break;
      case 2:
      this.setState({
        password: evt.target.value 
      });
      break;
      case 3:
      this.setState({
        email: evt.target.value 
      });
      break;
      case 4:
      this.setState({
        firstname: evt.target.value 
      });
      break;
      case 5:
      this.setState({
        lastname: evt.target.value 
      });
      break;
      case 6:
      this.setState({
        phone: evt.target.value 
      });
      break;
    }
  }

  validateData(){
    
  }

  login(e){
    e.preventDefault();
    fetch('http://localhost:8080/user/signin', {
      method: 'POST',
      mode:'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: this.state.login,
        password: this.state.password,
      })
    }).then(response => response.json())
    .then(result => this.saveUserData(result));
    }

    saveUserData(data){
      localStorage.setItem('loggedUser', JSON.stringify(data));
      this.setState({loggedUser:data});
      localStorage.setItem('isLoggedIn', true);
      if(this.state.loggedUser.id > 0){
        console.log(this.state.loggedUser.id);
        this.props.history.push('/myProfilePage'); 
      }
    }

  register(e){
    e.preventDefault();
    fetch('http://localhost:8080/user/signup', {
      method: 'POST',
      mode:'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.login,
        password: this.state.password,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        phone: this.state.phone
      })
    }).then(result => {
        console.log(result.json());
    })
  }

  render() {  
    return (
      <div className="LoginPage container">

          <div class="login-page">

            <div class="form">

              <form class="register-form">
                
                <h1>Rejestracja</h1>
                <input value={this.state.login} onChange={evt => this.updateInputValue(evt,1)} type="text" placeholder="Login*" required/>
                <input value={this.state.password} onChange={evt => this.updateInputValue(evt,2)} type="password" placeholder="Hasło*" required/>
                <input type="password" placeholder="Powtórz hasło*" required/>
                <input value={this.state.email} onChange={evt => this.updateInputValue(evt,3)} type="text" placeholder="E-mail*" required/>
                <input value={this.state.firstname} onChange={evt => this.updateInputValue(evt,4)} type="text" placeholder="Imie"/>
                <input value={this.state.lastname} onChange={evt => this.updateInputValue(evt,5)} type="text" placeholder="Nazwisko"/>
                <input value={this.state.phone} onChange={evt => this.updateInputValue(evt,6)} type="text" placeholder="Numer telefonu"/>
                <button onClick={this.register} >Stwórz konto</button>
                <p class="message">Jesteś już zarejestrowany? <a onClick = {this.switchwindows}>Zaloguj się!</a></p>
                <p class="message">Pola oznaczone * są obowiązkowe</p>
              </form>
              
              <form class="login-form">
                <h1>Logowanie</h1>
                <input value={this.state.login} onChange={evt => this.updateInputValue(evt,1)} type="text" placeholder="Login..." required/>
                <input value={this.state.password} onChange={evt => this.updateInputValue(evt,2)} type="password" placeholder="Hasło..." required/>
                <button onClick = {this.login}>Zaloguj</button>
                <p class="message">Nie masz konta? <a onClick = {this.switchwindows}>Zarejestruj się!</a></p>
              </form>
             
            </div>
          
          </div>
            
    
    </div>
    );
  }
}
export default LoginPage;
