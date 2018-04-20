import React, { Component } from 'react';
//import './MainPage.css';
import Spinner from '../components/Spinner';
class MainPage extends Component {
  constructor(props){
    super(props);
    this.state = ({"cos":0});
  }
  // ma byc spinner dopoki nie przyjdzie response z backendu czy kod jest poprawny
  componentDidMount(){

    fetch('http://localhost:8080/user/confirm', {
        method: 'POST',
        mode:'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.props.match.params.id,
          value: this.props.match.params.value,
        })
      }).then(response => response.json())
      .then(result => {        
        console.log(result);
      });
  }

  render() {
     
        return (
            <div className="AdminPage">
              <p>I HAVE THE POWER!!!</p>
            </div>
          );
     
      
    
  }
}

export default MainPage;
