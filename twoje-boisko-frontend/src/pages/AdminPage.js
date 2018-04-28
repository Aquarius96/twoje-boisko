import React, {Component} from 'react';
//import './MainPage.css';
import Spinner from '../components/Spinner';
import AdminNews from '../components/AdminNews';
import AdminObjects from '../components/AdminObjects';
import AdminUsers from '../components/AdminUsers';
import './LoginPage.css';
import '../components/Modal.css';
class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = ({objects: [], dataCollected: false, searchText: "", selectValue: "", wrapperRef: {}});
    this.handleTextChange = this
      .handleTextChange
      .bind(this);
    this.handleSelectChange = this
      .handleSelectChange
      .bind(this);
    this.openModal = this
      .openModal
      .bind(this);
    this.closeModal = this
      .closeModal
      .bind(this);
    this.setWrapperRef = this
      .setWrapperRef
      .bind(this);
    this.handleClickOutside = this
      .handleClickOutside
      .bind(this);
  }
  // ma byc spinner dopoki nie przyjdzie response z backendu czy kod jest poprawny
  componentDidMount() {
    fetch(`http://localhost:8080/object/allObjects`, {mode: 'cors'})
      .then(response => response.json())
      .then(data => {
        var dataTab = [];
        Object
          .keys(data)
          .forEach(function (key) {
            dataTab.push(data[key]);
          });
        this.setState({objects: dataTab});
        setTimeout(() => {
          this.setState({dataCollected: true});
        }, Math.random() * 1500);
        console.log("state of objects", this.state.objects);
      });
  }
 
  setWrapperRef() {
    var wrapper = document.getElementById("wrapper");
    this.setState({
      wrapperRef: wrapper
    }, console.log("m " + wrapper));
  }
 
  handleClickOutside(event) {
    if (this.state.wrapperRef && !this.state.wrapperRef.contains(event.target)) {
      this.closeModal();
    }
  }
 
  handleTextChange(e) {
    this.setState({searchText: e.target.value});
  }
 
  handleSelectChange(e) {
    this.setState({selectValue: e.target.value});
  }
 
  openModal() {
    document.addEventListener('mousedown', this.handleClickOutside);
    var modal = document.getElementById("modal");
    this.setWrapperRef();
    modal
      .classList
      .add("display");
    setTimeout(function () {
      modal
        .classList
        .add("transition");
    }, 20); //20milliseconds
  }
 
  closeModal() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    var modal = document.getElementById("modal");
    modal
      .classList
      .remove("transition");
    setTimeout(function () {
      //timeout before removing modal, so that animations have time to play out.
      modal
        .classList
        .remove("display");
    }, 200); //0.3s
  }

  render() {
    if (this.state.dataCollected) {
      switch (this.props.match.params.url) {
        case "obiekty":
          return (
            <div>
              <div className="ustawienieInputa">
                <input
                  type="text"
                  id="myInput"
                  placeholder="Wyszukaj obiekt..."
                  title="Wpisz miasto"
                  onChange={this.handleTextChange}></input>
              </div>

              <div className="ustawienieSelecta">
                <div class="select">
                  <select name="selectMenu" onChange={this.handleSelectChange}>
                    <option selected value="">Wybierz typ obiektu</option>
                    <option value="orlik">orlik</option>
                    <option value="stadion">stadion</option>
                  </select>
                </div>
              </div>
              <button className="przyciskDodajObiekt " onClick={this.openModal}>Dodaj obiekt</button>
              <div class="modal" id="modal">
                <div id="wrapper" class="wrapper">
                  <div class="message">
                  <h1>Dodaj obiekt</h1>
                  <input name="nazwa" type="text" placeholder="Nazwa obiektu"/>
                  <input name="dniotwarcia" type="text" placeholder="Dni otwarcia"/>
                  <input name="godzinyotwarcia" type="time" placeholder="Godziny otwarcia"/>
                  <input name="adres" type="text" placeholder="Adres"/>
                  <input name="cennik" type="text" placeholder="Cennik"/>
                  <input name="kontakt" type="text" placeholder="Kontakt"/>
                    <button class="przyciskAdminObiekt" onClick={this.closeModal}>Dodaj obiekt</button>
                  </div>
                </div>
              </div>
          
              <AdminObjects
                objects={this.state.objects}
                searchText={this.state.searchText}
                selectValue={this.state.selectValue}/>
            </div>
          )
        case "aktualnosci":
          return <AdminNews/>
        case "uzytkownicy":
          return <AdminUsers/>
        default:
          return <p>admin</p>
      }
    } else {
      return <Spinner/>
    }

  }
}

export default AdminPage;
