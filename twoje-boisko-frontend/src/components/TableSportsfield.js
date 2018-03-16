import React, { Component } from 'react';
import './TableSportsfield.css';

class TableSportsfield extends Component {
    constructor(props){
        super(props);
    }

    sortTable(n){
      var table, rows, switching, i, x, y, shouldSwitch, asc, switchcount = 0;
      var table = document.getElementById("myTable");
      var rows = table.getElementsByTagName("TR");
      switching = true;
      asc = true; 
      while (switching) {
        switching = false;
        rows = table.getElementsByTagName("TR");
        for (i = 1; i < (rows.length - 1); i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];
          if (asc) {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch= true;
              break;
            }
          } else if (!asc) {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              shouldSwitch= true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          switchcount ++; 
        } else {
          if (switchcount == 0 && asc) {
            asc = false;
            switching = true;
          }
        }
      }
    }
    render() {
    var mockTableRows = {
        "one":{"name":'Orlik przy szkole podstawowej nr 6',"address":'Szczytno ul. Polska 12'},
        "two":{"name":"Orlik przy zespole szkół nr 3","address":'Szczytno ul. Polska 12'},
        "three":{"name":"Orlik przy szkole podstawowej nr 23","address":'Szczytno ul. Polska 12'}
    }
    var mockTableRowsTab = [];
    Object.keys(mockTableRows).forEach(function(key){
        mockTableRowsTab.push(mockTableRows[key]);
    });
    return (
      <div class="tableContainer">
      <input type="text" id="myInput" placeholder="Wyszukaj miasto..." title="Wpisz miasto"></input>
            <table id="myTable">
                <tr class="header">
                    <th class ="nazwa">Nazwa Boiska</th>
                    <th class ="miasto">Adres</th>            
                    <th class ="przycisk"></th>       
                </tr>
                {mockTableRowsTab.map(item => 
                 <tr>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td><button class="button button1" onClick={() => this.sortTable(0)}>Szczegóły</button></td>
                </tr>
                )}
        </table>
      </div>
    );
  }
}

export default TableSportsfield;