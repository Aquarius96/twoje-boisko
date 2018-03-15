import React, { Component } from 'react';
import './TableSportsfield.css';

class TableSportsfield extends Component {
  render() {
    return (
      <div class="tableContainer">
      <input type="text" id="myInput" placeholder="Wyszukaj miasto..." title="Type in a name"></input>
            <table id="myTable">
                <tr class="header">
                    <th>Nazwa Boiska</th>
                    <th>Miasto</th>                   
                </tr>
                <tr>
                    <td>Orlik przy SP nr 6</td>
                    <td>Szczytno</td>
                </tr>
                <tr>
                    <td>Orlik przy ZS nr 3</td>
                    <td>Warszawa</td>
                </tr>
                <tr>
                <div class="row">
                    <div class="col-sm-6"><td>Orlik przy SP nr 23</td></div>
                    <div class="col-sm-6">  <td>
                        <div class="row">
                            <div class="col-sm-8 pt-2">Kraków</div>
                            <div class="col-sm-4"><button class="button button1">Szczegóły</button></div>
                        </div>
                        </td></div>

                </div>
                    
                  
                </tr>
        </table>
      </div>
    );
  }
}

export default TableSportsfield;