import React, { Component } from 'react';
//import './MainPage.css';
class MainPage extends Component {
  constructor(props){
    super(props);
    this.setState({userId:null,confirmationCode:""});
  }
  // ma byc spinner dopoki nie przyjdzie response z backendu czy kod jest poprawny
  componentDidMount(){

    fetch(`http://localhost:8080/test/getjwt`,{mode:'cors'}) //tutaj wysle kod i id usera do backendu
            .then(response => response.json())
            .then(data =>{
              console.log(data);
              console.log(jwtDecode(data.value));
          })      
  }

  render() {
    return (
      <div className="MainPage container">
        <p>Email został potwierdzony, teraz przekierujemy Cię do strony logowania...</p>
      </div>
    );
  }
}

export default MainPage;
