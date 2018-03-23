import React, { Component } from 'react';
import './TableSportsfield.css';
import $ from 'jquery';

class TableSportsfield extends Component {
    constructor(props){
        super(props);
        this.state=({objects:[]});
        this.sortTable=this.sortTable.bind(this);
        this.switchArrow=this.switchArrow.bind(this);
        this.componentDidMount=this.componentDidMount.bind(this);
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

    switchArrow(id){
      if ($('#'+id).hasClass('fa-arrow-up')){
        $('#'+id).toggleClass('fas fa-arrow-down');
      }
      else{
        $('#'+id).toggleClass('fas fa-arrow-up');
      }
      
    }

    sortTable(n){
      this.switchArrow(n);
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
          if (switchcount === 0 && asc) {
            asc = false;
            switching = true;
          }
        }
      }
    }
    render() {
    var mockTableRows = {
        "one":{"name":'Orlik przy szkole podstawowej nr 6',"city":'Wawa','street':'ul.Polska','streetNumber':'15'},
        "two":{"name":"Orlik przy zespole szkół nr 3","city":'Szczytno','street':'ul.Polna','streetNumber':'15'},
        "three":{"name":"Orlik przy szkole podstawowej nr 23","city":'Szczytno','street':'ul.Polska','streetNumber':'15'}
    }
   
    return (
      <div class="tableContainer">
      <div class="row">
      <input type="text" id="myInput" placeholder="Wyszukaj miasto..." title="Wpisz miasto"></input>
      
      </div>
            <table id="myTable">
                <tr class="header">
                    <th onClick={() => this.sortTable(0)}class ="nazwa">Nazwa Boiska <i id="0"class="fas fa-arrow-up"></i></th>
                    <th onClick={() => this.sortTable(1)}class ="miasto">Adres <i id="1"class="fas fa-arrow-up"></i></th>
                    <th class ="przycisk"></th>    
                </tr>
                {this.state.objects.map(item => 
                 <tr>
                    <td>{item.name}</td>
                    <td>{item.city}, {item.street} {item.streetNumber}</td>                   
                    <td><button class="button button1">Szczegóły</button></td>
                </tr>
                )}
        </table>
      </div>
    );
  }
}

export default TableSportsfield;