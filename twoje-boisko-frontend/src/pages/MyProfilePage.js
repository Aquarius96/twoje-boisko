import React, { Component } from 'react';
import './MyProfilePage.css';
import $ from 'jquery';

class MyProfilePage extends Component {
  constructor(props){
    super(props);
    this.showEditPassword=this.showEditPassword.bind(this);
  }

  showEditPassword(){
    $('#editPassword').slideToggle();
    if(document.getElementById("zapisz").innerHTML!="Zapisz hasło"){
      document.getElementById("zapisz").innerHTML="Zapisz hasło";
    }
    else{
      document.getElementById("zapisz").innerHTML="Zapisz zmiany";
    }
    }
    

    render() {
      return (
        <div className="MyProfile container">
        <div class = "ProfileForm">
        <h1> Marcin Zapadka </h1>
        <p class="info"> e-mail: </p>
        <p> marcinzapadka33@gmail.com </p>
        <p class="info"> telefon: </p>
        <p> 518 799 424 </p>
        </div>
        <div class="row">
        <div class="profile col-sm-6">
          <div class="row">
          <label class="col-sm-2">Imię:</label>
          <input class="col-sm-10"placeholder="Marcin"></input>
          </div>
          <div class="row">
          <label class="col-sm-2">Nazwisko:</label>
          <input class="col-sm-10"placeholder="Zapadka"></input>
          </div>
          <div class="row">
          <label class="col-sm-2">Email:</label>
          <input class="col-sm-10"placeholder="marcinzapadka33@wp.pl"></input>
          </div>
          <div class="row">
          <label class="col-sm-2">Telefon:</label>
          <input class="col-sm-10"placeholder="518799424"></input>
          </div>
        </div>
        <div class="edit col-sm-6">
        <button class="przyciskAnuluj" onClick={this.showEditPassword}>Zmień hasło</button>
        <button id="zapisz" class="przyciskAnuluj">Zapisz zmiany</button>
        <div id="editPassword">
        <div class="row">
          <label class="col-sm-3">Stare hasło:</label>
          <input type="password"class="col-sm-9"></input>
          </div>
          <div class="row">
          <label class="col-sm-3">Nowe hasło:</label>
          <input type="password"class="col-sm-9"></input>
          </div>
          <div class="row">
          <label class="col-sm-3">Powtórz hasło:</label>
          <input type="password"class="col-sm-9"></input>
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