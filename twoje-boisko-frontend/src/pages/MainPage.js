import React, { Component } from 'react';
import './MainPage.css';
import News from '../components/News';
import NewsTab from '../components/NewsTab';
class MainPage extends Component {
  render() {
    return (
      <div className="MainPage container">
      <div class="news-tab row">
      <NewsTab />
      <NewsTab />
      <NewsTab />
      </div>
      </div>
    );
  }
}

export default MainPage;
