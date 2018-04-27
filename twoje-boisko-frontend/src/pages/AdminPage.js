import React, {Component} from 'react';
//import './MainPage.css';
import Spinner from '../components/Spinner';
import AdminNews from '../components/AdminNews';
import AdminObjects from '../components/AdminObjects';
import AdminUsers from '../components/AdminUsers';
class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = ({objects: [], dataCollected: false, searchText: "", selectValue: ""});
    this.handleTextChange = this
      .handleTextChange
      .bind(this);
    this.handleSelectChange = this
      .handleSelectChange
      .bind(this);
  }
  // ma byc spinner dopoki nie przyjdzie response z backendu czy kod jest poprawny
  componentDidMount() {
    fetch(`http://localhost:8080/object/allObjects`, {mode: 'cors'})
      .then(response => response.json())
      .then(data => {
        var dataTab = [];
        Object
          .keys(data)
          .forEach(function (key) {
            dataTab.push(data[key]);
          });
        this.setState({objects: dataTab});
        setTimeout(() => {
          this.setState({dataCollected: true});
        }, Math.random() * 1500);
        console.log("state of objects", this.state.objects);
      })
  }

  handleTextChange(e) {
    this.setState({searchText: e.target.value});
  }

  handleSelectChange(e) {
    this.setState({selectValue: e.target.value});
  }

  render() {
    if (this.state.dataCollected) {
      switch (this.props.match.params.url) {
        case "obiekty":
          return (
            <div>
              <div className="ustawienieInputa">
                <input
                  type="text"
                  id="myInput"
                  placeholder="Wyszukaj obiekt..."
                  title="Wpisz miasto"
                  onChange={this.handleTextChange}></input>
              </div>

              <div className="ustawienieSelecta">
                <div class="select">
                  <select name="selectMenu" onChange={this.handleSelectChange}>
                    <option selected value="">Wybierz typ obiektu</option>
                    <option value="orlik">orlik</option>
                    <option value="stadion">stadion</option>
                  </select>
                </div>
              </div>
              <button className="przyciskDodajObiekt">Dodaj obiekt</button>
              <form>
              <input
                  type="text"
                  class="formInput"
                  placeholder="Nazwa"
                  title="Wpisz nazwę obiektu"></input>

                  <input
                  type="text"
                  class="formInput"
                  placeholder="Nazwa"
                  title="Wpisz nazwę obiektu"></input>
              </form>

              <AdminObjects
                objects={this.state.objects}
                searchText={this.state.searchText}
                selectValue={this.state.selectValue}/>
            </div>
          )
        case "aktualnosci":
          return <AdminNews/>
        case "uzytkownicy":
          return <AdminUsers/>
        default:
          return <p>admin</p>
      }
    } else {
      return <Spinner/>
    }

  }
}

export default AdminPage;
