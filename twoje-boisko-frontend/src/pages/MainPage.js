import React, { Component } from 'react';
import './MainPage.css';
import News from './News';
class MainPage extends Component {
  render() {
    return (
      <div className="MainPage container">
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

export default MainPage;
