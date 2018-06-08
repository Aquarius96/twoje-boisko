import React, {Component} from 'react';
import TableSportsfield from '../components/TableSportsfield';
import Spinner from '../components/Spinner';
import '../components/TableSportsfield.css';
class SportsfieldsListPage extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      objects: [],
      pickedObjects: [],
      dataCollected: false,
      searchText: "",
      selectValue: "",
      currentPage: 1
    });
    this.handleTextChange = this
      .handleTextChange
      .bind(this);
    this.handleSelectChange = this
      .handleSelectChange
      .bind(this);
    this.pickObjects = this
      .pickObjects
      .bind(this);
  }
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
      })
  }

  handleTextChange(e) {
    this.setState({searchText: e.target.value});
    this
      .props
      .history
      .push("/listaBoisk/1");
  }

  handleSelectChange(e) {
    this.setState({
      selectValue: e.target.value
    });
    this
      .props
      .history
      .push("/listaBoisk/1");
  }

  pickObjects() {
    var objects = [];
    var page = this.state.currentPage;    
    this
      .state
      .objects
      .map(item => {
        if (item.id >= 7 * (page - 1) && item.id < 7 * page) 
          objects.push(item);
      });
    this.setState({pickedObjects: objects});
  }

  render() {
    if (this.state.dataCollected) {
      return (
        <div className="">

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
          <TableSportsfield
            history={this.props.history}
            objects={this.state.objects}
            searchText={this.state.searchText}
            selectValue={this.state.selectValue}
            showAdmin={false}
            page={this.props.match.params.page}
            route="/listaBoisk/"/>
        </div>
      );
    } else {
      return <Spinner/>
    }

  }
}

export default SportsfieldsListPage;
