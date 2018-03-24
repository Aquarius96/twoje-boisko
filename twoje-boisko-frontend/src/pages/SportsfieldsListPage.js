import React, { Component } from 'react';
import TableSportsfield from '../components/TableSportsfield';
class SportsfieldsListPage extends Component {
  constructor(props){
    super(props);
    this.state=({items:[]});
  }

  render() {
    return (
      <div className="container">
      <TableSportsfield />
      </div>
    );
  }
}

export default SportsfieldsListPage;
