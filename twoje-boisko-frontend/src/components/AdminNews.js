import React, { Component } from 'react';
import NewsTab from '../components/NewsTab';

class AdminNews extends Component {
  render() {
    return (
      <div class="">
        <div class="news-tab">
      <NewsTab />
      <NewsTab />
      <NewsTab />
      </div>
</div>
           );
  }
}

export default AdminNews;