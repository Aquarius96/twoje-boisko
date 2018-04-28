import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import $ from 'jquery';
import '../css/tables.css';
import '../css/buttons.css';
import '../css/checkbox.css';
import 'react-datepicker/dist/react-datepicker.css';
import './SingleObjectPage.css';
class SingleObjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      object: {},
      reservations: {},
      startDate: moment(),
      hourStart: null,
      hourEnd: null,
      userId: null
    });
    this.handleChange = this
      .handleChange
      .bind(this);
    this.countInArray = this
      .countInArray
      .bind(this);
    this.reserve = this
      .reserve
      .bind(this);
    this.addReservation = this
      .addReservation
      .bind(this);
    this.blockReservations = this
      .blockReservations
      .bind(this);
    this.insertToday = this
      .insertToday
      .bind(this);
  }
  componentDidUpdate() {
    this.blockReservations();
  }
  componentDidMount() {
    try {
      this.setState({
        userId: JSON
          .parse(localStorage.getItem('loggedUser'))
          .id
      });
    } catch (err) {
      console.log("error");
    }
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
        console.log("state of reservations", this.state.reservations);
        this.blockReservations();
      });
  }

  insertToday(item, tab) {
    if (item.dateDay == this.state.startDate.format("DD-MM-YYYY")) {
      tab.push(item);
    }
  }

  blockReservations() {
    var blockTab = [];
    var res = this.state.reservations;
    var resToday = [];
    for (var k = 0; k < res.length; k++) {
      this.insertToday(res[k], resToday);
    }
    console.log(resToday);
    for (var i = 0; i < resToday.length; i++) {
      for (var j = Number(resToday[i].hourStart); j < Number(resToday[i].hourEnd); j++) {
        if (blockTab.indexOf(j.toString().concat("-", (j + 1).toString())) < 0) {
          blockTab.push(j.toString().concat("-", (j + 1).toString()));
        }
      }
    }

    var inputs = document.getElementsByClassName("reserve");
    for (var i = 0; i < inputs.length; i++) {
      if (blockTab.indexOf(inputs[i].value) >= 0) {
        inputs[i].disabled = true;
      } else 
        inputs[i].disabled = false;
      }
    console.log(blockTab);
  }
  addReservation() {
    fetch('http://localhost:8080/res/add', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dateDay: this
          .state
          .startDate
          .format("DD-MM-YYYY"),
          hourStart: this.state.hourStart,
          hourEnd: this.state.hourEnd,
          idObject: this.props.match.params.id,
          idUser: this.state.userId
        })
      })
      .then(response => response.json())
      .then(result => console.log(result));
  }

  handleChange(date) {
    this.setState({
      startDate: date
    }, () => {
      console.log(this.state.startDate)
    });
    this.blockReservations();
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
    
    console.log("min" + min);
    console.log("max" + max);
    for (var i = min + 1; i < max; i++) {
      console.log("test");
      if (this.countInArray(hoursTab, i) != 2) {
        wynik = false;
        break;
      }
    }
    if (wynik) {
      console.log("rezerwujemy");

      if (min > 0 && max > 0 && this.state.userId >= 0) {
        console.log("dzialam");
        this.setState({
          hourStart: min,
          hourEnd: max
        }, () => this.addReservation());
        console.log(this.state.hourStart);
        console.log(this.state.hourEnd);
        console.log(this.state.userId);
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

  render() {
    return (
      <div className="xD">

        <div class="row">
          <div class="map col-xl-8">
            <h1>
              Tu bedzie mapa
            </h1>

          </div>
          <div class="col-xl-4">

            <div class="ObjectForm">
              <h1>Orlik przy szkole podstawowej nr 6 w Szczytnie</h1>
              <p class="info">
                Dni otwarcia:
              </p>
              <p>poniedziałek - piątek</p>
              <p class="info">
                Godziny otwarcia:
              </p>
              <p>8:00 - 18:00</p>
              <p class="info">
                Adres:
              </p>
              <p>Boh. Września 22</p>
              <p class="info">
                Cennik:
              </p>
              <p>20zł/h</p>
              <p class="info">
                Kontakt:
              </p>
              <p>136 821 952</p>
            </div>
          </div>
          <div className="col-xl-2 offset-8">
            <DatePicker selected={this.state.startDate} onChange={this.handleChange}/>
          </div>
        </div>

        <div class="ObjectReservationTable-scroll">
          <table class="ObjectReservationTable">

            <tr class="header file">
              <th class="godzinyRezerwacji">Godziny rezerwacji obiektu sportowego</th>
              <th class="rezerwacja">Rezerwacja</th>
            </tr>

            <tr>
              <td>8-9</td>
              <td>
                <label class="check">
                  <input type="checkbox" className="reserve" name="reserve" value="8-9"/>
                  <div class="box"></div>
                </label>
              </td>
            </tr>

            <tr>
              <td>9-10</td>
              <td>
                <label class="check">
                  <input type="checkbox" className="reserve" name="reserve" value="9-10"/>
                  <div class="box"></div>
                </label>
              </td>
            </tr>

            <tr>
              <td>10-11</td>
              <td>
                <label class="check">
                  <input type="checkbox" className="reserve" name="reserve" value="10-11"/>
                  <div class="box"></div>
                </label>
              </td>
            </tr>

            <tr>
              <td>11-12</td>
              <td>
                <label class="check">
                  <input type="checkbox" className="reserve" name="reserve" value="11-12"/>
                  <div class="box"></div>
                </label>
              </td>
            </tr>

            <tr>
              <td>12-13</td>
              <td>
                <label class="check">
                  <input type="checkbox" className="reserve" name="reserve" value="12-13"/>
                  <div class="box"></div>
                </label>
              </td>
            </tr>

            <tr>
              <td>13-14</td>
              <td>
                <label class="check">
                  <input type="checkbox" className="reserve" name="reserve" value="13-14"/>
                  <div class="box"></div>
                </label>
              </td>
            </tr>

            <tr>
              <td>14-15</td>
              <td>
                <label class="check">
                  <input type="checkbox" className="reserve" name="reserve" value="14-15"/>
                  <div class="box"></div>
                </label>
              </td>
            </tr>

            <tr>
              <td>15-16</td>
              <td>
                <label class="check">
                  <input type="checkbox" className="reserve" name="reserve" value="15-16"/>
                  <div class="box"></div>
                </label>
              </td>
            </tr>

            <tr>
              <td>16-17</td>
              <td>
                <label class="check">
                  <input type="checkbox" className="reserve" name="reserve" value="16-17"/>
                  <div class="box"></div>
                </label>
              </td>
            </tr>

            <tr>
              <td>17-18</td>
              <td>
                <label class="check">
                  <input type="checkbox" className="reserve" name="reserve" value="17-18"/>
                  <div class="box"></div>
                </label>
              </td>
            </tr>

          </table>
        </div>
        <button class="przyciskRezerwuj" onClick={this.reserve}>Rezerwuj</button>

      </div>
    );
  }
}

export default SingleObjectPage;