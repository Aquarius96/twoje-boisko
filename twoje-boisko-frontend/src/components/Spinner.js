import React, { Component } from 'react';
import './Spinner.css';

class Spinner extends Component {

  render() {
      return (
          <div>
        <div className="filler"></div>
        <div className="cssload-container">
        
		<div className="cssload-sphere cssload-s-gold"></div>
		<div className="cssload-sphere cssload-s-5"></div>
		<div className="cssload-sphere cssload-s-4"></div>
		<div className="cssload-sphere cssload-s-3"></div>
		<div className="cssload-sphere cssload-s-2"></div>
		<div className="cssload-sphere cssload-s-1"></div>
</div></div>
      );
  }
}

export default Spinner;



