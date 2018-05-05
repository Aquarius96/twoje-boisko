import React, {Component} from 'react';
import NewsTab from '../components/NewsTab';
import News from '../components/News';
import Spinner from '../components/Spinner';
import {Link} from 'react-router-dom';
var jwtDecode = require('jwt-decode');
class Pagination extends Component {
  constructor(props) {
    super(props);
    // props to
    // spread = 5, dataLength, dataPerPage, Route
    this.state=({Links:[]});
    this.calculateTotalPages = this.calculateTotalPages.bind(this);
    this.calculateLinks=this.calculateLinks.bind(this);
    this.switchPage=this.switchPage.bind(this);
  }

  componentDidMount() {
    var totalPages = this.calculateTotalPages(this.props.dataLength,this.props.dataPerPage);
    this.calculateLinks(totalPages,parseInt(this.props.current));
  }

  componentDidUpdate(prevProps,prevState){
      if(prevProps != this.props){
        var totalPages = this.calculateTotalPages(this.props.dataLength,this.props.dataPerPage);
        this.calculateLinks(totalPages,parseInt(this.props.current));
      }
    
  }



  calculateTotalPages(count,dataOnPage){
    if(count % dataOnPage === 0){
     // console.log(Math.floor(count / dataOnPage));
      return Math.floor(count / dataOnPage);
    }
    else{
     // console.log(Math.floor(count / dataOnPage) + 1);
      return Math.floor(count / dataOnPage) + 1;
    }
  }

  calculateLinks(totalPages,currentPage){
      console.log("current "+currentPage);
      console.log("data length"+this.props.dataLength)
      console.log("data on page"+this.props.dataPerPage);
    var array = [];
    var spread = 5;
    var counter = 0;
    
    if(currentPage != 1){
        array.push({nr:1,txt:"<<"});
    }
    if(currentPage > 2){
        array.push({nr:currentPage-1,txt:"<"});
    }
    counter++;    
    // if(currentPage > 2 && counter < totalPages){
    //     array.push(currentPage - 1);
    //     counter++;
    // }
    
    if(counter < totalPages-1 && !array.includes(currentPage)){
        array.push({nr:currentPage,txt:currentPage});
    }    
    // if(currentPage < totalPages - 1 && counter < totalPages-1){
    //     array.push(currentPage + 1);
    //     counter++;
    // }
    // while(counter < spread - 1 && currentPage  < totalPages - 1){
    //     array.push(currentPage + counter);
    //     counter++;
    // }
    if(currentPage < totalPages - 1){
        array.push({nr:currentPage+1,txt:">"});
    }
    if(currentPage < totalPages){
        array.push({nr:totalPages,txt:">>"});                
    }    
    
    console.log(counter < totalPages);
    console.log("array "+array);
    console.log(array.length);
    console.log(typeof(currentPage));
    console.log("totalPages"+totalPages);
    //return array;
    this.setState({Links:array});
  }

  switchPage(link){
      this.props.history.push(link);
  }

  render() {
   
      return (<div>
          {this.state.Links.map(item =>{
                    return (
                                 
                    <button onClick={() => this.switchPage(this.props.route+item.nr)}>{item.txt}</button>
                
                    );
                  
                } 
                 
                )}
      </div>);
      
  }
}

export default Pagination;
