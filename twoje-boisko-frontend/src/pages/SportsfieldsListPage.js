import React, { Component } from 'react';
import TableSportsfield from '../components/TableSportsfield';
import Spinner from '../components/Spinner';
class SportsfieldsListPage extends Component {
  constructor(props){
    super(props);
    this.state=({objects:[],dataCollected:false});
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
            setTimeout(() => {
              this.setState({dataCollected:true});
            },Math.random()*1500);
            console.log("state of objects", this.state.objects);
          })          
  }
  render() {
    if(this.state.dataCollected){
      return (
        <div className="">
        <TableSportsfield objects={this.state.objects}/>
        </div>
      );
    }
    else{
      return <Spinner />
    }
    
  }
}

export default SportsfieldsListPage;
