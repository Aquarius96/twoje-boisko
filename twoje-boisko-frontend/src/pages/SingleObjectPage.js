import React, { Component, PropTypes } from 'react';
import './SingleObjectPage.css';
class SingleObjectPage extends Component {
    constructor(props){
        super(props);
        this.state=({object:{}});
    }

    componentDidMount(){
        fetch(`http://localhost:8080/object/allObjects`,{mode:'cors'}) 
              .then(response => response.json())
              .then(data =>{
              var dataTab = [];
              Object.keys(data).forEach(function(key){
                dataTab.push(data[key]);
            });
              this.setState({objects:dataTab});
              console.log("state of objects", this.state.objects);
            })          
    }

  render() {
    return (
      <div className=" container">
        <p>{this.props.match.params.id}</p>
      </div>
    );
  }
}

export default SingleObjectPage;
