import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './SingleObjectPage.css';
class SingleObjectPage extends Component {
    constructor(props){
        super(props);
        this.state=({object:{}});
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
      </div>
        

        <div id="ObjectReservationTable-scroll">
        <table id="ObjectReservationTable">
        
            <tr class="header">
            <th class="godzinyRezerwacji">Godziny rezerwacji obiektu sportowego</th>
            <th class="rezerwacja">Rezerwacja</th>
            </tr>

            <tr>
            <td>Orlik przy SP 3</td>
            <td><input type="checkbox" value="checked" />
            </td>
            </tr>

            <tr>
            <td>Orlik przy SP 3</td>
            <td><input type="checkbox" value="checked" /></td>
            </tr>

            <tr>
            <td>Orlik przy SP 3</td>
            <td><input type="checkbox" value="checked" /></td>
            </tr>

            <tr>
            <td>Orlik przy SP 3</td>
            <td><input type="checkbox" value="checked" /></td>
            </tr>
            
            <tr>
            <td>Orlik przy SP 3</td>
            <td><input type="checkbox" value="checked" /></td>
            </tr>
            
            <tr>
            <td>Orlik przy SP 3</td>
            <td><input type="checkbox" value="checked" /></td>
            </tr>

        </table>
        </div>
      </div>
    );
  }
}

export default SingleObjectPage;
