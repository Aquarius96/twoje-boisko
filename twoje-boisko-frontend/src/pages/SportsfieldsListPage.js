import React, { Component } from 'react';
import TableSportsfield from '../components/TableSportsfield';
import 'whatwg-fetch';
import { resolve } from 'path';
class SportsfieldsListPage extends Component {
  constructor(props){
    super(props);
    this.state=({items:[]});
  }
  componentDidMount(){
    fetch(`http://localhost:8080/allUsers`,{mode:'cors'}) 
            .then(result=> {
            return result.json();
          }).then(data =>{
            console.log(data);
            var dataTab = [];
            Object.keys(data).forEach(function(key){
              dataTab.push(data[key]);
          });
            this.setState({items:dataTab});
            console.log("state", this.state.items);
          })
             
  }
  render() {
    return (
      <div className="container">
      <TableSportsfield />
      <div>{this.state.items.map(item => <p>{item.password}</p>)}</div>
      </div>
    );
  }
}

export default SportsfieldsListPage;
