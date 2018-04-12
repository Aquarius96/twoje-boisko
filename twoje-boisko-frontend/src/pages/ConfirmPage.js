import React, { Component } from 'react';
//import './MainPage.css';
class MainPage extends Component {
  constructor(props){
    super(props);
    this.setState({userId:null,confirmationCode:""});
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
      .then(result => console.log(result));
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
