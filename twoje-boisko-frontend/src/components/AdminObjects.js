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

  render() {
    return (
      <div class="tableContainer">

        <table class="myTable">
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
                    <td><button class="przyciskSzczegoly" onClick ={() => this.showEditData(item.id)}>Edytuj</button > </td> </tr>,
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