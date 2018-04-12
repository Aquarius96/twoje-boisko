import React, { Component } from 'react';
import './MainPage.css';
import NewsTab from '../components/NewsTab';
var jwtDecode = require('jwt-decode');
class MainPage extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    //var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJJc2FyZCIsInBhc3N3b3JkIjoiSGFzbG8xMjMiLCJmaXJzdG5hbWUiOiJNYXJjaW4iLCJsYXN0bmFtZSI6IlphcGFka2EiLCJlbWFpbCI6InphcGFka2FAd3AucGwiLCJwaG9uZSI6IjY2NjI0MDgyMyJ9.MWc6WyEwzcrYcGClrE8zsUM5CSrXZRs39Z_i5Z9Q9sY';

    //var decoded = jwtDecode(token);
    //console.log(decoded);

    fetch(`http://localhost:8080/test/getjwt`,{mode:'cors'}) 
            .then(response => response.json())
            .then(data =>{
              console.log(data);
              console.log(jwtDecode(data.value));
          })      
  }

  render() {
    return (
      <div className="MainPage container">
      <div class="news-tab row">
      <NewsTab />
      <NewsTab />
      <NewsTab />
      
      </div>
      </div>
    );
  }
}

export default MainPage;
