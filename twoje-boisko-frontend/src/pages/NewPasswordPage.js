import React, {Component} from 'react';
import Spinner from '../components/Spinner';
class NewPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = ({userId: null, dataCollected: false});
    this.changePassword = this
      .changePassword
      .bind(this);
  }
  componentDidMount() {

    fetch('http://localhost:8080/user/getConCode', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({id: this.props.match.params.id, value: this.props.match.params.value})
      })
      .then(response => response.json())
      .then(result => {
        this.setState({dataCollected: true});
      });
  }

  changePassword(e) {
    e.preventDefault();
    fetch('http://localhost:8080/user/newpaswd', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({id: this.props.match.params.id, paswd: document.forgotForm.password.value})
      })
      .then(response => response.json())
      .then(result => {        
        if(result){
          window.alert('Pomyślnie zmieniono hasło. Teraz możesz się zalogować.');
          this.props.history.push("/LoginPage");
        }
      })
      .catch(err => window.alert(err.value))
  }

  render() {
    if (this.state.dataCollected) {
      return (
        <div className="NewPasswordPage form">
          <form name="forgotForm" className="login-form">
            <h1>Zmień hasło</h1>
            <input name="password" type="password" placeholder="Hasło..." required/>
            <input
              name="checkPassword"
              type="password"
              placeholder="Powtórz hasło..."
              required/>
            <button class="przyciskZaloguj" onClick={this.changePassword}>Zmień</button>
          </form>
        </div>
      );
    } else {
      return <Spinner/>
    }

  }
}

export default NewPasswordPage;
