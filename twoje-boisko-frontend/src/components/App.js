import React, { Component } from 'react';
import './App.css';
import News from './News';

import Navbar from './Navbar';
class App extends Component {
  render() {
    return (
      <div className="App container">
      <Navbar />
        <div class="news-tab">
        <div class="float-left"> <News /></div>
        <div class="float-left"> <News /></div>
        <div class="float-left"> <News /></div>
        <div class="float-left"> <News /></div>
        <div class="float-left"> <News /></div>
        <div class="float-left"> <News /></div>
        <div class="float-left"> <News /></div>
        <div class="float-left"> <News /></div>
        <div class="float-left"> <News /></div>
        </div>
        
          
      </div>
    );
  }
}

export default App;
