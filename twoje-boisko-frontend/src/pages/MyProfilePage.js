import React, { Component } from 'react';
import './MyProfilePage.css';
import '../css/buttons.css';
import '../css/tables.css';
import $ from 'jquery';

class MyProfilePage extends Component {
  constructor(props){
    super(props);
    this.state=({loggedUser:""});
    this.showEditPassword=this.showEditPassword.bind(this);
    this.saveUserData=this.saveUserData.bind(this);
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
  showEditPassword(){
    $('#editPassword').toggle({duration: 1000});
    console.log(this.state.loggedUser);
    }

    saveUserData(data){
      if(data.id == -1){
        window.alert("Użytkownik o podanym adresie e-mail już istnieje");
      }
      else{
        localStorage.setItem('loggedUser', JSON.stringify(data));
        this.setState({loggedUser:data});
        window.alert("Pomyślnie zaktualizowano dane");
      }
    
    }
    
    

    validateUpdateData(){
      const reg = document.editForm;
      var passwordPattern=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
      var emailPattern=/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      var phonePattern=/^[0-9]{9,}/;
      if(reg.firstname.value === "") reg.firstname.value = this.state.loggedUser.firstname;
      if(reg.lastname.value === "") reg.lastname.value = this.state.loggedUser.lastname;
      if(reg.email.value === "") reg.email.value = this.state.loggedUser.email;
      if(reg.phone.value === "") reg.phone.value = this.state.loggedUser.phone;
      if(reg.newPassword.value === "") reg.newPassword.value = this.state.loggedUser.password;
      if(reg.checkPassword.value === "") reg.checkPassword.value = this.state.loggedUser.password;
      if(!passwordPattern.test(reg.newPassword.value)){
        window.alert("Podaj hasło długości od 8 do 16 znaków oraz zawierające literę oraz cyfrę");
        return false;
      }
      else if(reg.newPassword.value !== reg.checkPassword.value){
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
      //window.alert("Pomyślnie zaktualizowano dane");
      return true;
    }

    updateUserData = (e) =>{
      e.preventDefault();
      if(this.validateUpdateData()){
        fetch('http://localhost:8080/user/update', {
          method: 'POST',
          mode:'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: JSON.parse(localStorage.getItem('loggedUser')).id,
            username: JSON.parse(localStorage.getItem('loggedUser')).username,
            password: document.editForm.newPassword.value,
            firstname: document.editForm.firstname.value,
            lastname: document.editForm.lastname.value,
            email: document.editForm.email.value,
            phone: document.editForm.phone.value
          })
        }).then(response => response.json())
        .then(result => this.saveUserData(result));
      }
     
    }

    
    render() {
      return (
        <div className="MyProfile container">
       <div className="row myProfileData">
       <div className="col-3">
       <div class = "ProfileForm">
        <h1>{this.state.loggedUser.username}</h1>
        <p class="info"> e-mail: </p>
        <p>{this.state.loggedUser.email}</p>
        <p class="info"> telefon: </p>
        <p>{this.state.loggedUser.phone}</p>
        <button class="przyciskEdytuj" onClick = {this.showEditPassword}>Edytuj dane osobowe</button>
        </div>
       </div>

       
       <form name="editForm" className="col-sm-9 profile" id = "editPassword">
        <div className="row">
        <div className="col-sm-7 dane">
        <div class="row">
          <label class="col-sm-4">Imię:</label>
          <input name="firstname" class="col-sm-8"placeholder={this.state.loggedUser.firstname}></input>
          </div>
          <div class="row">
          <label class="col-sm-4">Nazwisko:</label>
          <input name="lastname" class="col-sm-8"placeholder={this.state.loggedUser.lastname}></input>
          </div>
          <div class="row">
          <label class="col-sm-4">Email:</label>
          <input name="email" class="col-sm-8"placeholder={this.state.loggedUser.email}></input>
          </div>
          <div class="row">
          <label class="col-sm-4">Telefon:</label>
          <input name="phone" class="col-sm-8"placeholder={this.state.loggedUser.phone}></input>
          </div>
        </div>
        <div className="col-sm-5 haslo">
        
        <div class="row">
          
          <input name="password" type="password"class="hasloinput" placeholder="Stare hasło"></input>
          </div>
          <div class="row">
          
          <input name="newPassword" type="password"class="hasloinput" placeholder="Nowe hasło"></input>
          </div>
          <div class="row">
          
          <input name="checkPassword" type="password"class="hasloinput" placeholder="Powtórz hasło"></input>
          </div>
          
          <div class="row">
          
          <button id="zapisz" class="przyciskZapiszZmiany right"onClick={this.updateUserData}>Zapisz zmiany</button>
          </div>
        
        
        </div>
        </div>
       </form>
       
       </div>


       

        <table class="ReservationTable">
            <tr class="header">
            <th class="obiekt">Obiekt</th>
            <th class="adresObiektu">Adres</th>
            <th class="dataRezerwacji">Data rezerwacji</th>
            <th class="godzinaRezerwacji">Godzina rezerwacji</th>
            <th class="przyciskAnulujTabela"></th>
            </tr>

            <tr>
            <td>Orlik przy SP 3</td>
            <td>Polska 12</td>
            <td>02.03.2018</td>
            <td>12:30 - 13:30</td>
            <td><button class="przyciskAnuluj">Anuluj</button></td>
            </tr>

            <tr>
            <td>Orlik przy SP 3</td>
            <td>Polska 12</td>
            <td>02.03.2018</td>
            <td>12:30 - 13:30</td>
            <td><button class="przyciskAnuluj">Anuluj</button></td>
            </tr>

            <tr>
            <td>Orlik przy SP 3</td>
            <td>Polska 12</td>
            <td>02.03.2018</td>
            <td>12:30 - 13:30</td>
            <td><button class="przyciskAnuluj">Anuluj</button></td>
            </tr>

        </table>
        </div>
      );
    }
  }
  
  export default MyProfilePage;