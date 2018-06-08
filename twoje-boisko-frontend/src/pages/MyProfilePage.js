import React, {Component} from 'react';
import './MyProfilePage.css';
import '../css/buttons.css';
import '../css/tables.css';
import $ from 'jquery';
import Spinner from '../components/Spinner';
import axios from 'axios';

class MyProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = ({loggedUser: "", dataCollected: false, reservations: null});
    this.showEditPassword = this
      .showEditPassword
      .bind(this);
    this.saveUserData = this
      .saveUserData
      .bind(this);
  }

  componentDidMount() {
    var user = localStorage.getItem('loggedUser');
    if (user) {
      this.setState({
        loggedUser: JSON.parse(user),
        dataCollected: true
      }, () => this.fetchReservations(this.state.loggedUser.id));
    }
  }
  showEditPassword() {
    $('#editPassword').toggle({duration: 1000});
  }

  fetchReservations = (id) => {
    axios
      .get("http://localhost:8080/res/find_u?id=" + id)
      .then(res => {        
        if (res.data.length > 0) {
          console.log(res.data);
          const arr = [];                
                for(let i = 0; i < res.data.length; i++) {
                    arr.push(res.data[i].e1);
                    arr[i].name = res.data[i].e2.name;
                    arr[i].city = res.data[i].e2.city;
                    arr[i].street = res.data[i].e2.street;
                    arr[i].streetNumber = res.data[i].e2.streetNumber;
                }
                console.log(arr);
          this.setState({reservations: arr})
        }
      });
  }

  deleteReservation = (id) => {    
    var data = {};
    data.id = id;
    axios
      .post("http://localhost:8080/res/delete", data)
      .then(res => this.setState({
        reservations: this
          .state
          .reservations
          .filter(x => x.id !== res.data.id)
      }));
  }

  saveUserData(data) {
    if (data.id == -1) {
      window.alert("Użytkownik o podanym adresie e-mail już istnieje");
    } else {
      localStorage.setItem('loggedUser', JSON.stringify(data));
      this.setState({loggedUser: data});
      window.alert("Pomyślnie zaktualizowano dane");
    }
  }

  validateUpdateData() {
    const reg = document.editForm;
    var passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    var emailPattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var phonePattern = /^[0-9]{9,}/;
    if (reg.firstname.value === "") 
      reg.firstname.value = this.state.loggedUser.firstname;
    if (reg.lastname.value === "") 
      reg.lastname.value = this.state.loggedUser.lastname;
    if (reg.email.value === "") 
      reg.email.value = this.state.loggedUser.email;
    if (reg.phone.value === "") 
      reg.phone.value = this.state.loggedUser.phone;
    if (!passwordPattern.test(reg.newPassword.value) && reg.newPassword.value.length > 0) {
      window.alert("Podaj hasło długości od 8 do 16 znaków oraz zawierające literę oraz cyfrę");
      return false;
    } else if (reg.newPassword.value !== reg.checkPassword.value && reg.newPassword.value.length > 0) {
      window.alert("Podane hasła nie zgadzają się");
      return false;
    } else if (!emailPattern.test(reg.email.value) && reg.email.value.length > 0) {
      window.alert("Podany adres e-mail jest nieprawidłowy");
      return false;
    } else if (!phonePattern.test(reg.phone.value) && reg.phone.value.length > 0) {
      window.alert("Podany numer telefonu jest nieprawidłowy");
      return false;
    }    
    return true;
  }

  updateUserData = (e) => {
    e.preventDefault();
    if (this.validateUpdateData()) {
      var data = JSON
      .parse(localStorage.getItem('loggedUser'));
      console.log('update');
      
      

      if(document.editForm.newPassword.value.length > 0){
        data.password = document.editForm.newPassword.value;
      }
      if(document.editForm.firstname.value.length > 0){
        data.firstname = document.editForm.firstname.value;
      }
      if(document.editForm.lastname.value.length > 0){
        data.lastname = document.editForm.lastname.value;
      }
      if(document.editForm.email.value.length > 0){
        data.email = document.editForm.email.value;
      }
      if(document.editForm.phone.value.length > 0){
        data.phone = document.editForm.phone.value;
      }
      
     if(document.editForm.newPassword.value.length > 0 || document.editForm.password.value.length > 0 || document.editForm.checkPassword.value.length > 0){
      console.log(JSON
        .parse(localStorage.getItem('loggedUser')));
       const passData = {};
       passData.id = data.id;
       passData.paswd = document.editForm.password.value;

       axios.post('http://localhost:8080/user/checkpaswd', passData)
       .then(res => {
         if(res.data){
           data.password = document.editForm.newPassword.value;
           axios.post('http://localhost:8080/user/update/', data)
           .then(res => {
             console.log(res.data)
           })
           .catch(err => console.log(err))
         } else {
           axios.post('http://localhost:8080/user/update/hash', data)
           .then(res => {
             console.log(res.data)
           })
           .catch(err => console.log(err))
         }
       })
       .catch(err => console.log(err))
     }

      /*axios
        .post('http://localhost:8080/user/update', data)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response.data))*/
        /*fetch('http://localhost:8080/user/update', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
          body: JSON.stringify({
            id: JSON
              .parse(localStorage.getItem('loggedUser'))
              .id,
            username: JSON
              .parse(localStorage.getItem('loggedUser'))
              .username,
            password: document.editForm.newPassword.value,
            firstname: document.editForm.firstname.value,
            lastname: document.editForm.lastname.value,
            email: document.editForm.email.value,
            phone: document.editForm.phone.value
          })
        })
        .then(response => response.json())
        .then(result => this.saveUserData(result))
        .catch(error => console.log(error))*/
    }

  }

  render() {
    if (this.state.dataCollected) {
      return (
        <div className="MyProfile">
          <div className="row myProfileData">
            <div className="col-xl-3">
              <div class="ProfileForm">
                <h1>{this.state.loggedUser.username}</h1>
                <p class="info">
                  e-mail:
                </p>
                <p>{this.state.loggedUser.email}</p>
                <p class="info">
                  telefon:
                </p>
                <p>{this.state.loggedUser.phone}</p>
                <button class="przyciskEdytuj" onClick={this.showEditPassword}>Edytuj dane osobowe</button>
              </div>
            </div>

            <form name="editForm" className="col-xl-9 profile" id="editPassword">
              <div className="row">
                <div className="col-xl-7 dane">
                  <div class="row">
                    <label class="col-xl-4">Imię:</label>
                    <input
                      name="firstname"
                      class="col-xl-8"
                      placeholder={this.state.loggedUser.firstname}></input>
                  </div>
                  <div class="row">
                    <label class="col-xl-4">Nazwisko:</label>
                    <input
                      name="lastname"
                      class="col-xl-8"
                      placeholder={this.state.loggedUser.lastname}></input>
                  </div>
                  <div class="row">
                    <label class="col-xl-4">Email:</label>
                    <input name="email" class="col-xl-8" placeholder={this.state.loggedUser.email}></input>
                  </div>
                  <div class="row">
                    <label class="col-xl-4">Telefon:</label>
                    <input name="phone" class="col-xl-8" placeholder={this.state.loggedUser.phone}></input>
                  </div>
                </div>
                <div className="col-xl-5 haslo">

                  <div class="row">

                    <input
                      name="password"
                      type="password"
                      class="hasloinput"
                      placeholder="Stare hasło"></input>
                  </div>
                  <div class="row">

                    <input
                      name="newPassword"
                      type="password"
                      class="hasloinput"
                      placeholder="Nowe hasło"></input>
                  </div>
                  <div class="row">

                    <input
                      name="checkPassword"
                      type="password"
                      class="hasloinput"
                      placeholder="Powtórz hasło"></input>
                  </div>

                  <div class="row">

                    <button
                      id="zapisz"
                      class="przyciskZapiszZmiany right"
                      onClick={this.updateUserData}>Zapisz zmiany</button>
                  </div>

                </div>
              </div>
            </form>

          </div>

          {this.state.reservations
            ? <table class="ReservationTable">
                <tr class="header">
                  <th class="obiekt">Obiekt</th>
                  <th class="adresObiektu">Adres</th>
                  <th class="dataRezerwacji">Data rezerwacji</th>
                  <th class="godzinaRezerwacji">Godziny rezerwacji</th>
                  <th class="przyciskAnulujTabela"></th>
                </tr>
                {this
                  .state
                  .reservations
                  .map(res => {
                    return (

                      <tr>
                        <td>{res.name}</td>
                        <td>{res.city}, {res.street} {res.streetNumber}</td>
                        <td>{res.dateDay}</td>
                        <td>{res.hourStart}.00 - {res.hourEnd}.00</td>
                        <td>
                          <button class="przyciskAnuluj" onClick={() => this.deleteReservation(res.id)}>Anuluj</button>
                        </td>
                      </tr>

                    );
                  })}
              </table>
            : <p>Wygląda na to, że nie masz aktualnie żadnych rezerwacji. Przejdź do listy
              boisk, aby to zmienić!</p>
}

        </div>
      );
    } else 
      return <Spinner/>
  }
}

export default MyProfilePage;