import React, {Component} from 'react';
import $ from 'jquery';
//import './Spinner.css';
import '../css/spinner.css';

class TableSingleObject extends Component {
  constructor(props){
    super(props);
    this.state=({hourStart:null,hourEnd:null});
    this.countInArray = this
      .countInArray
      .bind(this);
    this.addReservation = this
      .addReservation
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
      this.validateReservationData=this.validateReservationData.bind(this);
  }
  addReservation() {
    this.closeModal();   
    fetch('http://localhost:8080/res/add', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dateDay: this
          .props
          .startDate
          .format("DD-MM-YYYY"),
          hourStart: this.state.hourStart,
          hourEnd: this.state.hourEnd,
          idObject: this.props.objectId,
          idUser: this.props.userId
        })
      })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if(result.type != "error"){
          window.alert("Pomyślnie zarezerwowano!");
        }        
        this.props.update();
      });
  }

  validateReservationData(){
   
    var hours = $("input[name=reserve]:checked").map(function () {
      return this.value;
    }).get()
      .toString()
      .split("-")
      .join(",");
    var hoursTab = hours
      .split(',')
      .map(function (item) {
        return parseInt(item, 10);
      });

    var wynik = true;
    var min = hoursTab[0];
    var max = hoursTab[1];

    for (var i = 0; i < hoursTab.length; i++) {
      if (hoursTab[i] > max) 
        max = hoursTab[i];
      if (hoursTab[i] < min) 
        min = hoursTab[i];
      }
    
    
    for (var i = min + 1; i < max; i++) {      
      if (this.countInArray(hoursTab, i) != 2) {
        wynik = false;
        break;
      }
    }

    if (wynik && min >= 0 && max > 0 && this.props.userId >= 0) {
      console.log("rezerwujemy");

      
        console.log("dzialam");
        this.setState({
          hourStart: min,
          hourEnd: max
        });
        this.openModal();
        console.log(this.state.hourStart);
        console.log(this.state.hourEnd);
        console.log(this.props.userId);
      

    } else {
      window.alert("Podaj poprawne godziny rezerwacji");
      
    }
  }
  

  countInArray(array, what) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
      if (array[i] === what) {
        count++;
      }
    }
    return count;
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
    return (
      <div>
        <div className="SingleObjectTable"></div>        
        <div class="ObjectReservationTable-scroll">
            <table class="ObjectReservationTable">

              <tr class="header file">
                <th class="godzinyRezerwacji">Godziny dostępne do zarezerwowania obiektu sportowego</th>
                <th class="rezerwacja">Rezerwacja</th>
              </tr>

              {this
                .props
                .freeHours
                .map(item => {
                  return (
                    <tr>
                      <td>{item}</td>
                      <td>
                        <label class="check">
                          <input type="checkbox" className="reserve" name="reserve" value={item}/>
                          <div class="box"></div>
                        </label>
                      </td>
                    </tr>
                  )
                })}

            </table>
          </div>
          {this.props.userId || this.props.userId === 0 ?
          <button class="przyciskRezerwuj" onClick={this.validateReservationData}>Rezerwuj</button> :
          <p>Zaloguj się, aby móc zarezerwować ten obiekt</p>
          }
          <div class="modal" id="modal">
            <div id="wrapper" class="wrapper">
              <div class="message">
                <h1>Potwierdź rezerwację</h1>
                <p>Dzień: {this
                    .props
                    .startDate
                    .format("DD-MM-YYYY")}</p>
                <p>Godziny rezerwacji: {this.state.hourStart + "-" + this.state.hourEnd}</p>                
                <button class="przyciskPotwierdzDane" onClick={this.addReservation}>Zarezerwuj</button>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default TableSingleObject;
