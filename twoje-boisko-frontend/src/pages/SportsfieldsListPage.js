import React, {Component} from 'react';
import TableSportsfield from '../components/TableSportsfield';
import Spinner from '../components/Spinner';
import '../components/TableSportsfield.css';
class SportsfieldsListPage extends Component {
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

  pickObjects(){
    var objects = [];
    var page = this.state.currentPage;
    console.log("page"+page);
    console.log("objects length"+this.state.objects.length);
    this.state.objects.map(item => {
      if(item.id >= 7*(page-1) && item.id < 7*page)
        objects.push(item);
        console.log(item.id);      
    });
    this.setState({pickedObjects:objects});
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
          <p>{typeof(this.state.objects)}</p>
          <TableSportsfield
            objects={this.state.objects}
            searchText={this.state.searchText}
            selectValue={this.state.selectValue}/>
        </div>
      );
    } else {
      return <Spinner/>
    }

  }
}

export default SportsfieldsListPage;
