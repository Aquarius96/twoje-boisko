import React, { Component } from 'react';
import './MyProfilePage.css';
import $ from 'jquery';

class MyProfilePage extends Component {
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