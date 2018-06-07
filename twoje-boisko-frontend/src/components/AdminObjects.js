import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import '../less/buttons.less';

class AdminObjects extends Component {
  constructor(props) {
    super(props);
    this.state = ({objects: []});
    this.showEditData = this
      .showEditData
      .bind(this);
      this.delete=this.delete.bind(this);
  }

  componentDidMount() {
    this.setState({objects: this.props.objects});
  }

  showEditData(id) {
    document
      .getElementById(id)
      .classList
      .toggle("hidden");
    document
      .getElementById(id)
      .classList
      .toggle("showEdit");
  }

  delete(objectId){
    console.log("objectid"+objectId);
fetch('http://localhost:8080/object/delete', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
          body: JSON.stringify({
           id:objectId
          })
        })
        .then(result => result.json()).
        then(response => console.log(response));
  }

  render() {
    return (
      <div class="tableContainer">

        <table class="myAdminObjectTable">
          <tr class="header myRow">
            <th class="nazwa">Nazwa Boiska
            </th>
            <th class="miasto">Adres
            </th>
            <th class="przycisk"></th>
          </tr>
          {this
            .state
            .objects
            .map(item => {
              if ((item.name.toLowerCase().indexOf(this.props.searchText.toLowerCase()) !== -1 || item.city.toLowerCase().indexOf(this.props.searchText.toLowerCase())) !== -1 && (this.props.selectValue === "orlik" || this.props.selectValue.length === 0)) {
                return ([ < tr class = "myRow" > <td>{item.name}</td> < td > {
                    item.city
                  }, {
                    item.street
                  }
                  {
                    item.streetNumber
                  } </td>                   
                    <td><button class="przyciskSzczegoly" onClick ={() => this.showEditData(item.id)}>Edytuj</button > 
                    <button class="przyciskUsunObiekt" onClick ={() => this.delete(item.id)}>Usuń</button ></td> </tr>,
                <tr class="hidden" id={item.id}>
                <td colSpan="3">{item.openDays}</td > </tr>
                ]);
              }
            })}
        </table>
      </div>
    );
  }
}

export default AdminObjects;