import React, { Component } from 'react';
import './NewsTab.css';
import News from '../components/News';
class NewsTab extends Component {
    constructor(props){
        super(props);
       
    }
  render() {
    var allNews = {
        "one":{"header":'Joe'},"two":{"header":"Jane"},"three":{"header":"Fado"}
    }
    var allNewsTab = [];
    Object.keys(allNews).forEach(function(key){
        allNewsTab.push(allNews[key]);
    });
    return (<div class="news-tab row">
        {allNewsTab.map(item => <div class="col-sm-4"><News header={item.header}/></div>)}
        </div>
    );
  }
}

export default NewsTab;