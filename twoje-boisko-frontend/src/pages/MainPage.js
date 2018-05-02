import React, {Component} from 'react';
import NewsTab from '../components/NewsTab';
import News from '../components/News';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
var jwtDecode = require('jwt-decode');
class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state=({news: [],pickedNews:[],dataCollected:false,currentPage:1});
    this.pickNews=this.pickNews.bind(this);
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

      var page = this.props.match.params.page;
    console.log("this is my "+page);
    if(page == undefined){
      console.log("xundefined");
      //this.setState({currentPage:1});
    }
    else{
      console.log("xnieundefined");
      this.setState({currentPage:page});
    }

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
        this.pickNews();
      });
  }

  componentDidUpdate(prevProps,prevState){
    console.log(this.state.news.length);
    if(prevState.currentPage != this.props.match.params.page && this.props.match.params.page != undefined){
      this.setState({currentPage:this.props.match.params.page});
      this.pickNews();
    }
    
    //
  }

  pickNews(){
    var news = [];
    var page = this.state.currentPage;
    console.log("page"+page);
    console.log("news length"+this.state.news.length);
    this.state.news.map(item => {
      if(item.id >= 10*(page-1) && item.id < 10*page)
        news.push(item);
        console.log(item.id);      
    });
    this.setState({pickedNews:news});
  }

  render() {
   
      if(this.state.dataCollected){
        return (
          <div className="MainPage news-tab">
          <p>{typeof(this.props.match.params.page)}</p>
          <Pagination history={this.props.history} dataLength={this.state.news.length} dataPerPage={9} route="/aktualnosci/" current ={this.props.match.params.page}/>
        <div class="row">
        {this
            .state
            .pickedNews
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
