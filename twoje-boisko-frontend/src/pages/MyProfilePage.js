import React, { Component } from 'react';
import './MyProfilePage.css';
import $ from 'jquery';

class MyProfilePage extends Component {
  constructor(props){
    super(props);
    this.showEditPassword=this.showEditPassword.bind(this);
  }

  showEditPassword(){
    $('#editPassword').toggle({duration: 1000});
    }
    

    render() {
      return (
        <div className="MyProfile container">
       <div className="row myProfileData">
       <div className="col-3">
       <div class = "ProfileForm">
        <h1> Marcin Zapadka </h1>
        <p class="info"> e-mail: </p>
        <p> marcinzapadka33@gmail.com </p>
        <p class="info"> telefon: </p>
        <p> 518 799 424 </p>
        <button class="przyciskEdytuj" onClick = {this.showEditPassword}>Edytuj dane osobowe</button>
        </div>
       </div>
       <div className="col-sm-9 profile" id = "editPassword">
        <div className="row">
        <div className="col-sm-7 dane">
        <div class="row">
          <label class="col-sm-4">Imię:</label>
          <input class="col-sm-8"placeholder="Marcin"></input>
          </div>
          <div class="row">
          <label class="col-sm-4">Nazwisko:</label>
          <input class="col-sm-8"placeholder="Zapadka"></input>
          </div>
          <div class="row">
          <label class="col-sm-4">Email:</label>
          <input class="col-sm-8"placeholder="marcinzapadka33@wp.pl"></input>
          </div>
          <div class="row">
          <label class="col-sm-4">Telefon:</label>
          <input class="col-sm-8"placeholder="518799424"></input>
          </div>
        </div>
        <div className="col-sm-5 haslo">
        
        <div class="row">
          
          <input type="password"class="hasloinput" placeholder="Stare hasło"></input>
          </div>
          <div class="row">
          
          <input type="password"class="hasloinput" placeholder="Nowe hasło"></input>
          </div>
          <div class="row">
          
          <input type="password"class="hasloinput" placeholder="Powtórz hasło"></input>
          </div>
          
          <div class="row">
          <button id="zapisz" class="przyciskZapiszZmiany right">Zapisz zmiany</button>
          </div>
        
        
        </div>
        </div>
       </div>
       
       </div>


       

        <table id="ReservationTable">
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