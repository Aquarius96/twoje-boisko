import React, { Component } from 'react';
import './LoginPage.css';
import '../css/buttons.css';
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
    this.checkRegisterData=this.checkRegisterData.bind(this);
  }

  

  switchwindows()
  {
    $('form').animate({height: "toggle", opacity: "toggle"}, {duration:1000});
  }

  validateRegisterData(){
    const reg = document.registerForm;
    var loginPattern = /^[a-zA-Z0-9]{3,16}/;
    var passwordPattern=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    var emailPattern=/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var phonePattern=/^[0-9]{9,}/;
    if(reg.login.value === "" || reg.password.value === "" || reg.checkPassword.value === "" || reg.email.value === ""){
      window.alert("Proszę wypełnić wszystkie pola oznaczone symbolem *");
      return false;
    }
    else if(!loginPattern.test(reg.login.value)){
      window.alert("Podaj login długości od 3 do 16 znaków składający się tylko z liter oraz cyfr");
      return false;
    }
    else if(!passwordPattern.test(reg.password.value)){
      window.alert("Podaj hasło długości od 8 do 16 znaków oraz zawierające literę oraz cyfrę");
      return false;
    }
    else if(reg.password.value !== reg.checkPassword.value){
      window.alert("Podane hasła nie zgadzają się");
      return false;
    }
    else if(!emailPattern.test(reg.email.value)){
      window.alert("Podany adres e-mail jest nieprawidłowy");
      return false;
    }
    else if(!phonePattern.test(reg.phone.value)){
      window.alert("Podany numer telefonu jest nieprawidłowy");
      return false;
    }
    return true;
  }

  login(e){
    e.preventDefault();
    if(document.loginForm.login.value !== "" && document.loginForm.password.value !== ""){
      fetch('http://localhost:8080/user/signin', {
        method: 'POST',
        mode:'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login: document.loginForm.login.value,
          password: document.loginForm.password.value,
        })
      }).then(response => response.json())
      .then(result => this.saveUserData(result));
    }
    else{
      window.alert("Podaj login oraz hasło");
    }
   
    }

    saveUserData(data){
      localStorage.setItem('loggedUser', JSON.stringify(data));
      this.setState({loggedUser:data});
      localStorage.setItem('isLoggedIn', true);
      this.checkLoginData(data);
    }

    checkLoginData(user){
      switch(user.id){
        case -1:
        window.alert("Podano nieprawidłowy login");
        break;
        case -2:
        window.alert("Podano nieprawidłowe hasło");
        break;
        default:
        this.props.history.push('/myProfilePage');
      }
    }
    checkRegisterData(user){
      switch(user.id){
        case -1:
        window.alert("Podany login jest już zajęty");
        break;
        case -2:
        window.alert("Podany adres e-mail jest już zajęty");
        break;
        case -3:
        window.alert("Podany adres e-mail oraz login są już zajęte");
        break;
        case -4:
        window.alert("Problem z połączeniem. Spróbuj ponownie później");
        break;
        default:
        window.alert("Zarejestrowano pomyślnie");
        this.switchwindows();
      }
    }

  register(e){
    e.preventDefault();
    if(this.validateRegisterData()){
      fetch('http://localhost:8080/user/signup', {
        method: 'POST',
        mode:'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: document.registerForm.login.value,
          password: document.registerForm.password.value,
          firstname: document.registerForm.firstname.value,
          lastname: document.registerForm.lastname.value,
          email: document.registerForm.email.value,
          phone: document.registerForm.phone.value
        })
      }).then(result => result.json())
      .then(response => this.checkRegisterData(response))
    }
    
  }

  render() {  
    return (
      <div className="LoginPage">

          <div className="login-page">

            <div className="form">

              <form name="registerForm" className="register-form">
                
                <h1>Rejestracja</h1>
                
                <input name="login" type="text" placeholder="Login*" required/>
                <input name="password" type="password" placeholder="Hasło*" required/>
                <input name="checkPassword" type="password" placeholder="Powtórz hasło*" required/>
                <input name="email" type="text" placeholder="E-mail*" required/>
                <input name="firstname" type="text" placeholder="Imie"/>
                <input name="lastname" type="text" placeholder="Nazwisko"/>
                <input name="phone" type="text" placeholder="Numer telefonu"/>
                
                
                <button class = "przyciskZaloguj" onClick={this.register} >Stwórz konto</button>
                <p className="message">Jesteś już zarejestrowany? <a className="beniz" onClick = {this.switchwindows}>Zaloguj się!</a></p>
                <p className="message">Pola oznaczone * są obowiązkowe</p>
              </form>
              
              <form name="loginForm" className="login-form">
                <h1>Logowanie</h1>
                <input name="login" type="text" placeholder="Login..." required/>
                <input name="password" type="password" placeholder="Hasło..." required/>
                <button class = "przyciskZaloguj" onClick = {this.login}>Zaloguj</button>
                <p className="message">Nie masz konta? <a className="beniz" onClick = {this.switchwindows}>Zarejestruj się!</a></p>
              </form>
            </div>
          </div>
    </div>
    );
  }
}
export default LoginPage;