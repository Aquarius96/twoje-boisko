import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import $ from 'jquery';
import '../css/tables.css';
import '../css/buttons.css';
import '../css/checkbox.css';
import 'react-datepicker/dist/react-datepicker.css';
import './SingleObjectPage.css';
import '../components/Modal.css';
import Spinner from '../components/Spinner';
import TableSingleObject from '../components/TableSingleObject';

class SingleObjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      object: {},

      freeHours: {},
      reservations: {},
      startDate: moment(),
      hourStart: null,
      hourEnd: null,
      userId: null,
      dataCollected: false,
      reservationsCollected: false,
      hoursReady: false,
      updateBool: false
    });
    this.updateComponent = this
      .updateComponent
      .bind(this);
    this.handleChange = this
      .handleChange
      .bind(this);
    this.countInArray = this
      .countInArray
      .bind(this);

    this.blockReservations = this
      .blockReservations
      .bind(this);
    this.insertToday = this
      .insertToday
      .bind(this);

    this.fetchObjectData = this
      .fetchObjectData
      .bind(this);
    this.fetchReservationsData = this
      .fetchReservationsData
      .bind(this);
  }

  /* componentDidUpdate(prevProps, prevState) {
    if (prevState.dataCollected != this.state.dataCollected || prevState.updateBool != this.state.updateBool) {

      fetch(`http://localhost:8080/res/find_o/?id=` + this.props.match.params.id, {mode: 'cors'})
      .then(response => response.json())
      .then(data => {
        var dataTab = [];
        Object
          .keys(data)
          .forEach(function (key) {
            dataTab.push(data[key]);
          });
        this.setState({reservations: dataTab,dataCollected:true});
        console.log("state of reservations", this.state.reservations);
      });
      this.blockReservations();
    }
  }*/

  componentDidMount() {
    try {
      this.setState({
        userId: JSON
          .parse(localStorage.getItem('loggedUser'))
          .id
      });
    } catch (err) {      
    }

    this.fetchObjectData();
    this.fetchReservationsData();

  }

  fetchObjectData() {
    fetch(`http://localhost:8080/object/find?id=` + this.props.match.params.id, {mode: 'cors'})
      .then(response => response.json())
      .then(data => {
        var dataTab = [];
        Object
          .keys(data)
          .forEach(function (key) {
            dataTab[key] = data[key];
          });
        this.setState({object: dataTab});
        setTimeout(() => {
          this.setState({dataCollected: true});
        }, Math.random() * 1500);        
      });
  }

  fetchReservationsData() {
    if (this.state.dataCollected) {
      fetch(`http://localhost:8080/res/find_o/?id=` + this.props.match.params.id, {mode: 'cors'})
        .then(response => response.json())
        .then(data => {
          var dataTab = [];
          Object
            .keys(data)
            .forEach(function (key) {
              dataTab.push(data[key]);
            });
          this.setState({reservations: dataTab});
          setTimeout(() => {
            this.setState({reservationsCollected: true});
          }, Math.random() * 1500);          
        });
      this.blockReservations();
    } else {
      setTimeout(this.fetchReservationsData, 10);
    }

  }

  insertToday(item, tab) {
    if (item.dateDay == this.state.startDate.format("DD-MM-YYYY")) {
      tab.push(item);
    }
  }

  blockReservations() {
    if (this.state.reservationsCollected) {      
      var blockTab = [];
      var res = this.state.reservations;
      var resToday = [];
      for (var k = 0; k < res.length; k++) {
        this.insertToday(res[k], resToday);
      }      
      for (var i = 0; i < resToday.length; i++) {
        for (var j = Number(resToday[i].hourStart); j < Number(resToday[i].hourEnd); j++) {
          if (blockTab.indexOf(j.toString().concat("-", (j + 1).toString())) < 0) {
            blockTab.push(j.toString().concat("-", (j + 1).toString()));
          }
        }
      }      

      var start = parseInt(this.state.object.openHours.split("-")[0]);
      var end = parseInt(this.state.object.openHours.split("-")[1]);
      var myHours = [];
      for (var i = start; i < end; i++) {
        var e = i + "-" + (i + 1);
        if (blockTab.indexOf(e) == -1) {
          myHours.push(e);
        }

      }     

      this.setState({freeHours: myHours, hoursReady: true});

      var inputs = document.getElementsByClassName("reserve");
      for (var i = 0; i < inputs.length; i++) {
        if (blockTab.indexOf(inputs[i].value) >= 0) {
          inputs[i].disabled = true;          
          inputs[i]
            .classList
            .toggle("hidden");          
        } else 
          inputs[i].disabled = false;
        }      
    } else {
      setTimeout(this.blockReservations, 10);
    }
  }

  updateComponent() {
    this.setState({reservationsCollected: false});
    this.fetchReservationsData();    
  }

  handleChange(date) {
    this.setState({
      startDate: date
    }, () => {      
      this.blockReservations();
    });
    this.setState({
      updateBool: !this.state.updateBool
    });
  }

  reserve() {
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
    this.closeModal();
    if (wynik) {      
      if (min > 0 && max > 0 && this.state.userId >= 0) {        
        this.setState({
          hourStart: min,
          hourEnd: max
        }, () => this.addReservation());        
      }
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
    });
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
      modal
        .classList
        .remove("display");
    }, 200);
  }

  render() {

    if (this.state.dataCollected && this.state.hoursReady) {      
      var start = parseInt(this.state.object.openHours.split("-")[0]);
      var end = parseInt(this.state.object.openHours.split("-")[1]);
      var myHours = [];
      for (var i = start; i < end; i++) {
        myHours.push(i);
      }     
      return (
        <div className="xD">
          <div class="row">
            <div class="map col-xl-8">
              <img
                src={'http://localhost:8080/photo/get?name=' + this.state.object.photoName}/>
            </div>
            <div class="col-xl-4">

              <div class="ObjectForm">
                <h1>{this.state.object.name}</h1>
                <p class="info">
                  Dni otwarcia:
                </p>
                <p>{this.state.object.openDays}</p>
                <p class="info">
                  Godziny otwarcia:
                </p>
                <p>{this.state.object.openHours}</p>
                <p class="info">
                  Adres:
                </p>
                <p>{this.state.object.city}, {this.state.object.street} {this.state.object.streetNumber}</p>
                <p class="info">
                  Cennik:
                </p>
                <p>{this.state.object.priceList} zł/h</p>
                <p class="info">
                  Kontakt:
                </p>
                <p>{this.state.object.contact}</p>
              </div>
            </div>
            <div className="col-xl-2 offset-8">
              <DatePicker selected={this.state.startDate} onChange={this.handleChange}/>
            </div>
          </div>

          <TableSingleObject
            update={this.updateComponent}
            freeHours={this.state.freeHours}
            startDate={this.state.startDate}
            userId={this.state.userId}
            objectId={this.props.match.params.id}/>
        </div>
      );
    }
    return <Spinner/>

  }
}

export default SingleObjectPage;