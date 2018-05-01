import React, {Component} from 'react';
import NewsTab from '../components/NewsTab';
import News from '../components/News';
import Spinner from '../components/Spinner';
var jwtDecode = require('jwt-decode');
class Pagination extends Component {
  constructor(props) {
    super(props);
    // props to
    // spread = 5, dataLength, dataPerPage, Route
    this.state=({news: [],dataCollected:false});
    this.calculateTotalPages = this.calculateTotalPages.bind(this);
    this.calculateLinks=this.calculateLinks.bind(this);
  }

  componentDidMount() {
  
  }

  calculateTotalPages(count,dataOnPage){
    if(count % dataOnPage === 0){
      console.log(Math.floor(count / dataOnPage));
    }
    else{
      console.log(Math.floor(count / dataOnPage) + 1);
    }
  }

  calculateLinks(totalPages,currentPage,spread){
    var array = [];
    array.push(1);
    var i = 2;
    var j = 0;
    while(i < totalPages && i < spread){
        
        if(currentPage > i){
            array.push(currentPage-1+j);
            i++;
            j++;
        }
        array.push(currentPage);
        i++;
        j++;
        array.push(currentPage+1+j);
        i++;
        j++;
    }
    array.push(totalPages);
    console.log(array);
  }

  render() {
   
      return (<div>
          <p>{this.calculateLinks(10,3,5)}</p>
      </div>);
      
  }
}

export default Pagination;
