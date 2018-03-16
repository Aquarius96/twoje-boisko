import React, { Component } from 'react';
import './TableSportsfield.css';

class TableSportsfield extends Component {
    constructor(props){
        super(props);
    }

    sortTable(){
        
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
                    <td><button class="button button1">Szczegóły</button></td>
                </tr>
                )}
        </table>
      </div>
    );
  }
}

export default TableSportsfield;