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

      var page = this.props.match.params.page;    
    if(page == undefined){
      
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
        this.pickNews(9);
      });
  }

  componentDidUpdate(prevProps,prevState){
    console.log(this.state.news.length);
    if(prevState.currentPage != this.props.match.params.page && this.props.match.params.page != undefined){
      this.setState({currentPage:this.props.match.params.page});
      this.pickNews(9);
    }
    
    //
  }

  pickNews(itemCount){
    var news = [];
    var page = this.state.currentPage;
    var pagesCount = 0;
    var counter = 0;

    this.state.news.map(item => {
      if(counter == 0){
        news[pagesCount]=[];
        news[pagesCount].push(item);
        counter++;
      }
      else if(counter < itemCount){        
        news[pagesCount].push(item);
        counter++;
      }
      else{
        pagesCount++;
        counter = 0;
        news[pagesCount]=[];
        news[pagesCount].push(item);        
        counter++;
      }
      
            
    });
    this.setState({pickedNews:news[page-1]});
  }

  render() {
   
      if(this.state.dataCollected){
        return (
          <div className="MainPage news-tab">
          <p>{typeof(this.props.match.params.page)}</p>
          
        <div class="row">
        {this
            .state
            .pickedNews
            .map(item => <div class="col-sm-4"><News header={item.header} text={item.text} date={item.date} showAdmin={false}/></div>)}
        </div>
        <Pagination history={this.props.history} dataLength={this.state.news.length} dataPerPage={9} route="/aktualnosci/" current ={this.state.currentPage}/>
      </div>
    );
      }
      else{
        return <Spinner />
      }
      
  }
}

export default MainPage;
