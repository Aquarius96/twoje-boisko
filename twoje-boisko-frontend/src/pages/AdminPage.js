import React, { Component } from 'react';
//import './MainPage.css';
import Spinner from '../components/Spinner';
import AdminNews from '../components/AdminNews';
import AdminObjects from '../components/AdminObjects';
import AdminUsers from '../components/AdminUsers';
class AdminPage extends Component {
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
    switch(this.props.match.params.url){
      case "obiekty":
      return <AdminObjects />
      case "aktualnosci":
      return <AdminNews />
      case "uzytkownicy":
      return <AdminUsers />
      default: return <p>admin</p>
    }
  }
}

export default AdminPage;
