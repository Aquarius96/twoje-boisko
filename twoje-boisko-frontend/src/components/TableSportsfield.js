import React, { Component } from 'react';
import './TableSportsfield.css';

class TableSportsfield extends Component {
  render() {
    return (
      <div class="tableContainer">
            <table id="myTable">
                <tr class="header">
                    <th style="width:70%;">Nazwa Boiska</th>
                    <th style="width:30%;">Miasto</th>
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
                    <td>Orlik przy SP nr 23</td>
                    <td>Kraków</td>
                </tr>
        </table>
      </div>
    );
  }
}

export default TableSportsfield;