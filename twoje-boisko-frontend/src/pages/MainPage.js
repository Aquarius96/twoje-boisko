import React, {Component} from 'react';
import NewsTab from '../components/NewsTab';
import News from '../components/News';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
var jwtDecode = require('jwt-decode');
class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state=({news: [],dataCollected:false});
  }

  componentDidMount() {
    // var token =
    // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJJc2FyZCIsInBh
    // c3N3b3JkIjoiSGFzbG8xMjMiLCJmaXJzdG5hbWUiOiJNYXJjaW4iLCJsYXN0bmFtZSI6IlphcGFka2
    // EiLCJlbWFpbCI6InphcGFka2FAd3AucGwiLCJwaG9uZSI6IjY2NjI0MDgyMyJ9.MWc6WyEwzcrYcGC
    // lrE8zsUM5CSrXZRs39Z_i5Z9Q9sY'; var decoded = jwtDecode(token);
    // console.log(decoded);

    /*fetch(`http://localhost:8080/test/getjwt`, {mode: 'cors'})
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log(jwtDecode(data.value));
      })*/

      fetch(`http://localhost:8080/news/allNews`, {mode: 'cors'})
      .then(response => response.json())
      .then(data => {
        var dataTab = [];
        Object
          .keys(data)
          .forEach(function (key) {
            dataTab.push(data[key]);
          });
        this.setState({news: dataTab});
        setTimeout(() => {
          this.setState({dataCollected: true});
        }, Math.random() * 1500);
        console.log("state of news", this.state.news);
      });
  }

  render() {
   
      if(this.state.dataCollected){
        return (
          <div className="MainPage news-tab">
          <Pagination />
        <div class="row">
        {this
            .state
            .news
            .map(item => <div class="col-sm-4"><News header={item.header} text={item.text} date={item.date} showAdmin={false}/></div>)}
        </div>
      </div>
    );
      }
      else{
        return <Spinner />
      }
      
  }
}

export default MainPage;
