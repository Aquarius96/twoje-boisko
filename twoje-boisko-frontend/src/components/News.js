import React, { Component } from 'react';
import './News.css';

class News extends Component {
  render() {
    return (
      <div class="card border-secondary mb-3">
        <div class="card-header">{this.props.header}</div>
        <div class="card-body text-secondary">
          <h5 class="card-title">Secondary card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
           );
  }
}

export default News;