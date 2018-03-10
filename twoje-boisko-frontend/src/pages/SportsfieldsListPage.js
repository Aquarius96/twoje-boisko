import React, { Component } from 'react';
import '../App.css';
import Navbar from '../Navbar';
import News from '../TableSportsfield';
class App extends Component {
  render() {
    return (
      <div className="App container">
      <Navbar />
      <TableSportsfield />
      </div>
    );
  }
}

export default App;
