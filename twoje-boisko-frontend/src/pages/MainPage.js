import React, { Component } from 'react';
import './MainPage.css';
import News from '../components/News';
import NewsTab from '../components/NewsTab';
class MainPage extends Component {
  render() {
    return (
      <div className="MainPage container">
        <NewsTab />
        <NewsTab />
        <NewsTab />
        <NewsTab />
        
        
      </div>
    );
  }
}

export default MainPage;
