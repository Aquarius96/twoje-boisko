import React, { Component } from 'react';
//import './MainPage.css';
import Spinner from '../components/Spinner';
class MainPage extends Component {
  constructor(props){
    super(props);
    this.state = ({userId:null,confirmationCode:"",dataCollected:false});
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
        this.setState({dataCollected:true});
        console.log(this.props.match.params.id);
        console.log(this.props.match.params.value);
        
        console.log(result);
      });
  }

  render() {
      if(this.state.dataCollected){
        return (
            <div className="MainPage container">
              <p>Email został potwierdzony, teraz przekierujemy Cię do strony logowania...</p>
            </div>
          );
      }
      else{
          return <Spinner />
      }
    
  }
}

export default MainPage;
