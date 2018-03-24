import React, { Component, PropTypes } from 'react';
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
      <h1>Orlik przy szkole podstawowej nr 6 w Szczytnie</h1>
      <div class="row">
      <div class="map col-sm-7">

      </div>
      <div class="col-sm-5">
      <DatePicker />
      </div>
      </div>
        <p>{this.props.match.params.id}</p>
      </div>
    );
  }
}

export default SingleObjectPage;
