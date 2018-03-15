import React, { Component } from 'react';
import TableSportsfield from '../components/TableSportsfield';
class SportsfieldsListPage extends Component {
  render() {
    return (
      <div className="container">
      
      <TableSportsfield />
      
      <button class="button button1">Szczegóły</button>

      </div>
    );
  }
}

export default SportsfieldsListPage;
