import React, {Component} from 'react';
import Spinner from '../components/Spinner';
class ConfirmPage extends Component {
  constructor(props) {
    super(props);
    this.state = ({userId: null, confirmationCode: "", dataCollected: false});
  }

  componentDidMount() {
    fetch('http://localhost:8080/user/confirm', {
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
        setTimeout(() => this.props.history.push("/loginPage"), 3000);
      });
  }

  render() {
    if (this.state.dataCollected) {
      return (
        <div className="ConfirmPage">
          <p>Email został potwierdzony, teraz przekierujemy Cię do strony logowania...</p>
        </div>
      );
    } else {
      return <Spinner/>
    }
  }
}

export default ConfirmPage;
