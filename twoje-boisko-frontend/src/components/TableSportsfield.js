import React, { Component } from 'react';
import './TableSportsfield.css';

class TableSportsfield extends Component {
  render() {
    return (
      <div class="tableContainer">
      <input type="text" id="myInput" placeholder="Wyszukaj miasto..." title="Type in a name"></input>
            <table id="myTable">
                <tr class="header">
                    <th class ="nazwa">Nazwa Boiska</th>
                    <th class ="miasto">Adres</th>            
                    <th class ="przycisk"></th>       
                </tr>
                <tr>
                    <td>Orlik przy szkole podstawowej nr 6</td>
                    <td>Szczytno ul. Polska 12</td>
                    <td><button class="button button1">Szczegóły</button></td>

                </tr>
                <tr>
                    <td>Orlik przy zespole szkół nr 3</td>
                    <td>Warszawa ul. Jana Pawła 2</td>
                    <td><button class="button button1">Szczegóły</button></td>
                </tr>
                <tr>
                    <td>Orlik przy szkole podsatwowej nr 23</td>
                    <td>Kraków ul. Marcinów Zapadków 18</td>
                    <td><button class="button button1">Szczegóły</button></td>
                </tr>
        </table>
      </div>
    );
  }
}

export default TableSportsfield;