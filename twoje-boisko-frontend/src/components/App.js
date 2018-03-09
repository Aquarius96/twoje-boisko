import React, { Component } from 'react';
import './App.css';
import News from './News';

class App extends Component {
  render() {
    return (
      <div className="App container">
      
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
