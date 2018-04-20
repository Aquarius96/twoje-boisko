import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import './TableSportsfield.css';
import '../css/buttons.css';
import '../css/tables.css';
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
      this.setState({objects:this.props.objects});
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
      table = document.getElementsByClassName("myTable");
      table = table[0];
      rows = table.getElementsByTagName("TR");
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
    return (
      <div class="tableContainer">
            <table class="myTable">
                <tr class="header">
                    <th onClick={() => this.sortTable(0)}class ="nazwa">Nazwa Boiska <i id="0"class="fas fa-arrow-up"></i></th>
                    <th onClick={() => this.sortTable(1)}class ="miasto">Adres <i id="1"class="fas fa-arrow-up"></i></th>
                    <th class ="przycisk"></th>    
                </tr>
                {this.state.objects.map(item =>{
                  if(item.name.toLowerCase().indexOf(this.props.searchText.toLowerCase()) !== -1 || item.city.toLowerCase().indexOf(this.props.searchText.toLowerCase()) !== -1 && (this.props.selectValue === "orlik" || this.props.selectValue.length ===0)){
                    return (
                <tr>
                    <td>{item.name}</td>
                    <td>{item.city}, {item.street} {item.streetNumber}</td>                   
                    <td><Link to={"/object/"+item.id}><button class="przyciskSzczegoly">Szczegóły</button></Link></td>
                </tr>
                    );
                  }
                } 
                 
                )}
        </table>
      </div>
    );
  }
}

export default TableSportsfield;