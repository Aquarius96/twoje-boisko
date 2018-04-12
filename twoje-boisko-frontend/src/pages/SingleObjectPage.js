import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import $ from 'jquery';
import 'react-datepicker/dist/react-datepicker.css';
import './SingleObjectPage.css';
class SingleObjectPage extends Component {
    constructor(props){
        super(props);
        this.state=({object:{},startDate:moment()});
        this.handleChange=this.handleChange.bind(this); 
        this.countInArray = this.countInArray.bind(this);
        this.reserve=this.reserve.bind(this);
    }

    componentDidMount(){
        fetch(`http://localhost:8080/object/allObjects`,{mode:'cors'}) 
              .then(response => response.json())
              .then(data =>{
              var dataTab = [];
              Object.keys(data).forEach(function(key){
                dataTab.push(data[key]);
            });
              this.setState({objects:dataTab});
              console.log("state of objects", this.state.objects);
            })          
    }

    
    handleChange(date) {
      this.setState({
        startDate: date
      });
    }

    reserve(){
      var hours = $("input[name=reserve]:checked").map(
        function () {return this.value;}).get().toString().split("-").join(",");
        var hoursTab = hours.split(',').map(function(item) {
          return parseInt(item, 10);
      });

      var wynik = true;
      var min = hoursTab[0];
      var max = hoursTab[0];
      
      for(var i = 0; i < hoursTab.length; i++){
        if(hoursTab[i]>max) max = hoursTab[i];
        if(hoursTab[i]<min) min = hoursTab[i];
      }

      console.log("min"+min);
      console.log("max"+max);

      for(var i = min+1; i < max; i++){
        if(this.countInArray(hoursTab,i)!=2){
          wynik = false;
          break;
        }
      }

      if(wynik){
          console.log("rezerwujemy");
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
      <div className=" container">
      
      <div class="row">
      <div class="map col-sm-8">
      <h1> Tu bedzie mapa </h1>

      </div>
      <div class="col-sm-4">

      <div class = "ObjectForm">
        <h1>Orlik przy szkole podstawowej nr 6 w Szczytnie</h1>
        <p class="info"> Dni otwarcia: </p>
        <p>poniedziałek - piątek</p>
        <p class="info"> Godziny otwarcia: </p>
        <p>8:00 - 18:00</p>
        <p class="info"> Adres: </p>
        <p>Boh. Września 22</p>
        <p class="info"> Cennik: </p>
        <p>20zł/h</p>
        <p class="info"> Kontakt: </p>
        <p>136 821 952</p>
        </div>
      </div>
      <div className="col-sm-2 offset-8">
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
        />
      </div>
      </div>
        

        <div id="ObjectReservationTable-scroll">
        <table id="ObjectReservationTable">
        
            <tr class="header">
            <th class="godzinyRezerwacji">Godziny rezerwacji obiektu sportowego</th>
            <th class="rezerwacja">Rezerwacja</th>
            </tr>

            <tr>
            <td>8-9</td>
            <td><input type="checkbox" className="reserve" name="reserve" value="8-9" />
            </td>
            </tr>

            <tr>
            <td>9-10</td>
            <td><input type="checkbox" className="reserve" name="reserve" value="9-10" /></td>
            </tr>

            <tr>
            <td>10-11</td>
            <td><input type="checkbox" className="reserve" name="reserve" value="10-11" /></td>
            </tr>

            <tr>
            <td>11-12</td>
            <td><input type="checkbox" className="reserve" name="reserve" value="11-12" /></td>
            </tr>
            
            <tr>
            <td>12-13</td>
            <td><input type="checkbox" className="reserve" name="reserve" value="checked" /></td>
            </tr>
            
            <tr>
            <td>13-14</td>
            <td><input type="checkbox" className="reserve" name="reserve" value="checked" /></td>
            </tr>

            <tr>
            <td>14-15</td>
            <td><input type="checkbox" className="reserve" name="reserve" value="checked" /></td>
            </tr>

            <tr>
            <td>15-16</td>
            <td><input type="checkbox" className="reserve" name="reserve" value="checked" /></td>
            </tr>

            <tr>
            <td>16-17</td>
            <td><input type="checkbox" className="reserve" name="reserve" value="checked" /></td>
            </tr>

            <tr>
            <td>17-18</td>
            <td><input type="checkbox" className="reserve" name="reserve" value="checked" /></td>
            </tr>

        </table>
        </div>
        <button onClick={this.reserve}>Rezerwuj {this.props.match.params.id}</button>
      </div>
    );
  }
}

export default SingleObjectPage;
