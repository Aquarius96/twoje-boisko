import React, { Component } from 'react';
import './MainPage.css';
import News from '../components/News';
class MainPage extends Component {
  render() {
    return (
      <div className="MainPage container">
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
