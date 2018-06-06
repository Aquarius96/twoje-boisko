import React, {Component} from 'react';
import './LoginPage.css';
import '../css/buttons.css';
import $ from 'jquery';
import Spinner from '../components/Spinner';
import axios from 'axios';

class LoginPage extends Component {

  constructor(props)
  {
    super(props);
    this.state = ({
      login: "",
      password: "",
      email: "",
      firstname: "",
      lastname: "",
      phone: "",
      registered: false
    });
    this.switchwindows = this
      .switchwindows
      .bind(this);
    this.login = this
      .login
      .bind(this);
    this.register = this
      .register
      .bind(this);
    this.saveUserData = this
      .saveUserData
      .bind(this);
    this.checkRegisterData = this
      .checkRegisterData
      .bind(this);
      this.forgotPassword=this.forgotPassword.bind(this);
      this.forgotLogin=this.forgotLogin.bind(this);
  }

  switchwindows(window)
  {
    switch(window){
      case 'login':
      case 'register':
      $('.register-form').animate({
        height: "toggle",
        opacity: "toggle"
      }, {duration: 1000});
      $('.login-form').animate({
        height: "toggle",
        opacity: "toggle"
      }, {duration: 1000});
      break;
      case 'forgot-password':
      $('.login-form').animate({
        height: "toggle",
        opacity: "toggle"
      }, {duration: 1000});
      $('.forgot-password-form').animate({
        height: "toggle",
        opacity: "toggle"
      }, {duration: 1000});
      break;
      case 'forgot-login':
      $('.login-form').animate({
        height: "toggle",
        opacity: "toggle"
      }, {duration: 1000});
      $('.forgot-login-form').animate({
        height: "toggle",
        opacity: "toggle"
      }, {duration: 1000});
      break;
    }
    
  }

  validateRegisterData() {
    const reg = document.registerForm;
    var loginPattern = /^[a-zA-Z0-9]{3,16}/;
    var passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    var emailPattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var phonePattern = /^[0-9]{9,}/;
    if (reg.login.value === "" || reg.password.value === "" || reg.checkPassword.value === "" || reg.email.value === "") {
      window.alert("Proszę wypełnić wszystkie pola oznaczone symbolem *");
      return false;
    } else if (!loginPattern.test(reg.login.value)) {
      window.alert("Podaj login długości od 3 do 16 znaków składający się tylko z liter oraz cyfr");
      return false;
    } else if (!passwordPattern.test(reg.password.value)) {
      window.alert("Podaj hasło długości od 8 do 16 znaków oraz zawierające literę oraz cyfrę. Znaki specjalne są niedozwolone");
      return false;
    } else if (reg.password.value !== reg.checkPassword.value) {
      window.alert("Podane hasła nie zgadzają się");
      return false;
    } else if (!emailPattern.test(reg.email.value)) {
      window.alert("Podany adres e-mail jest nieprawidłowy");
      return false;
    } else if (!phonePattern.test(reg.phone.value)) {
      window.alert("Podany numer telefonu jest nieprawidłowy");
      return false;
    }
    this.setState({registered:true},() => {
      console.log("xd");
      this.forceUpdate();
    });
    return true;
  }

  login(e) {
    e.preventDefault();
    if (document.loginForm.login.value !== "" && document.loginForm.password.value !== "") {
      fetch('http://localhost:8080/user/signin', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
          body: JSON.stringify({login: document.loginForm.login.value, password: document.loginForm.password.value})
        })
        .then(response => response.json())
        
        .then(result => this.saveUserData(result));
    } else {
      window.alert("Podaj login oraz hasło");
    }

  }

  saveUserData(data) {
    if(data.type === "error"){
      window.alert(data.value);
    }
    else{
      if(!data.confirm) {
        window.alert('Twoje konto nie zostało jeszcze potwierdzone, Udaj się na pocztę email i przejdź w link aktywacyjny.');
      }
      else {
        localStorage.setItem('loggedUser', JSON.stringify(data));
        this.setState({loggedUser: data});
        localStorage.setItem('isLoggedIn', true);
        this.setState({logged: true});
            this
              .props
              .history
              .push('/myProfilePage')
      }
      
    }    
  }

  switchPage(user) {
    console.log(JSON.parse(localStorage.getItem('loggedUser')).id);
    console.log(user.id);
    if (JSON.parse(localStorage.getItem('loggedUser')).id != user.id) {
      setTimeout(() => {
        this.switchPage(user);
      }, 30);
    } else 
      this
        .props
        .history
        .push('/myProfilePage');

    }
  
 

  checkRegisterData(user) {
    if(user.type == "error"){
      window.alert(user.value);
    }
    else{
      window.alert("Potwierdź swoje konto linkiem aktywacyjnym, który znajdziesz na poczcie e-mail");
      this.switchwindows();
    }    
  }

  register(e) {
    e.preventDefault();
    if (this.validateRegisterData()) {
      var data = {};
      data.username= document.registerForm.login.value;
            data.password= document.registerForm.password.value;
            data.firstname= document.registerForm.firstname.value;
            data.lastname= document.registerForm.lastname.value;
            data.email= document.registerForm.email.value;
            data.phone= document.registerForm.phone.value;
            axios.post('http://localhost:8080/user/signup', data)
            .then(res => window.alert(res.data))
            .catch(err => window.alert(err.response.data.value))      
    }
  }

  forgotPassword(e){
    e.preventDefault();
    var body ={};
    body.value = document.forgotPasswordForm.email.value;
    axios.post('http://localhost:8080/user/forgot/password', body)
    .then(res => window.alert(res.data))
    .catch(err => window.alert(err.response.data));    
  }

  forgotLogin(e){
    e.preventDefault();
    fetch('http://localhost:8080/user/forgot/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
          body: JSON.stringify({
            value: document.forgotLoginForm.email.value
          })
        })
        .then(result => result.json())
        .then(response => console.log(response))
  }

  render() {
    if (!this.state.registered) {
      return (
        <div className="LoginPage">

          <div className="login-page">

            <div className="form">

              <form name="registerForm" className="register-form">

                <h1>Rejestracja</h1>

                <input name="login" type="text" placeholder="Login*" required/>
                <input name="password" type="password" placeholder="Hasło*" required/>
                <input
                  name="checkPassword"
                  type="password"
                  placeholder="Powtórz hasło*"
                  required/>
                <input name="email" type="text" placeholder="E-mail*" required/>
                <input name="firstname" type="text" placeholder="Imie"/>
                <input name="lastname" type="text" placeholder="Nazwisko"/>
                <input name="phone" type="text" placeholder="Numer telefonu*"/>

                <button class="przyciskZaloguj" onClick={this.register}>Stwórz konto</button>
                <p className="message">Jesteś już zarejestrowany?
                  <a className="beniz" onClick={() => this.switchwindows('login')}>Zaloguj się!</a>
                </p>
                <p className="message">Pola oznaczone * są obowiązkowe</p>
              </form>

              <form name="loginForm" className="login-form">
                <h1>Logowanie</h1>
                <input name="login" type="text" placeholder="Login..." required/>
                <input name="password" type="password" placeholder="Hasło..." required/>
                <button class="przyciskZaloguj" onClick={this.login}>Zaloguj</button>
                <p className="message">Nie masz konta?
                  <a className="beniz" onClick={() => this.switchwindows('login')}>Zarejestruj się!</a>
                </p>
                <p className="message">Zapomniałeś hasła?
                  <a className="beniz" onClick={() => this.switchwindows('forgot-password')}>Przypomnij hasło!</a>
                </p>
                <p className="message">Zapomniałeś loginu?
                  <a className="beniz" onClick={() => this.switchwindows('forgot-login')}>Przypomnij login!</a>
                </p>
              </form>

              <form name="forgotPasswordForm" className="forgot-password-form">
                <h1>Zapomniałeś hasła?</h1>
                <input name="email" type="text" placeholder="Adres e-mail..." required/>
                <button class="przyciskZaloguj" onClick={this.forgotPassword}>Przypomnij</button>
                <p className="message">
                  <a className="beniz" onClick={() => this.switchwindows('forgot-password')}>Wróć do logowania</a>
                </p>
              </form>

              <form name="forgotLoginForm" className="forgot-login-form">
                <h1>Zapomniałeś loginu?</h1>
                <input name="email" type="text" placeholder="Adres e-mail..." required/>
                <button class="przyciskZaloguj" onClick={this.forgotLogin}>Przypomnij</button>
                <p className="message">
                  <a className="beniz" onClick={() => this.switchwindows('forgot-login')}>Wróć do logowania</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      );
    } else 
      return <Spinner/>
  }
}
export default LoginPage;