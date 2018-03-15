import React, { Component } from 'react';
import './MainPage.css';
import News from '../components/News';
import NewsTab from '../components/NewsTab';
class MainPage extends Component {
  render() {
    return (
      <div className="MainPage container">
      <div class="news-tab row">
      <div class="col-sm-4"> <News header="raz"/></div>
      <div class="col-sm-4"> <News header="raz"/></div>
      <div class="col-sm-4"> <News header="raz"/></div>

        <NewsTab />
        </div>
        
      </div>
    );
  }
}

export default MainPage;
