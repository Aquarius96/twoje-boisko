import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import News from './News';
class App extends Component {
  render() {
    return (
      <div className="App container">
      <Navbar />
      <h1>Aktualności</h1>
      <div class="news-tab row">
        <div class="col-sm-4"> <News /></div>
        <div class="col-sm-4"> <News /></div>
        <div class="col-sm-4"> <News /></div>
        <div class="col-sm-4"> <News /></div>
        <div class="col-sm-4"> <News /></div>
        <div class="col-sm-4"> <News /></div>
        <div class="col-sm-4"> <News /></div>
        <div class="col-sm-4"> <News /></div>
        <div class="col-sm-4"> <News /></div>
        </div>
        
          
      </div>
    );
  }
}

export default App;
