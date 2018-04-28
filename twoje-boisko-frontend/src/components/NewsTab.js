import React, {Component} from 'react';
import './NewsTab.css';
import News from '../components/News';

class NewsTab extends Component {
  render() {
    var mockNews = {
      "one": {
        "header": 'Joe'
      },
      "two": {
        "header": "Jane"
      },
      "three": {
        "header": "Fado"
      }
    }
    var mockNewsTab = [];
    Object
      .keys(mockNews)
      .forEach(function (key) {
        mockNewsTab.push(mockNews[key]);
      });
    return (
      <div class="news-tab row">
        {mockNewsTab.map(item => <div class="col-sm-4"><News header={item.header}/></div>)}
      </div>
    );
  }
}

export default NewsTab;