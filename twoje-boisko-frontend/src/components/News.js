import React, {Component} from 'react';
import './News.css';

class News extends Component {
  constructor(props){
    super(props);
  }
  render() {
    if(this.props.showAdmin){
      return (
        <div class="news">
  
          <div class="card">
  
            <div class="content">
              <div class="title">
                <p>Saba</p>
              </div>
              <div class="separator"></div>
              <div class="text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquam, turpis
                nec sollicitudin euismod, sem lorem dignissim libero, eget iaculis lectus tellus
                sed velit. Curabitur vitae accumsan lacus. Nullam urna ante volutpat.
              </div>
            </div>
          </div>
  
        </div>
  
      );
    }
    return (
      <div class="news">

        <div class="card">

          <div class="content">
            <div class="title">
              <p>Fado</p>
            </div>
            <div class="separator"></div>
            <div class="text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquam, turpis
              nec sollicitudin euismod, sem lorem dignissim libero, eget iaculis lectus tellus
              sed velit. Curabitur vitae accumsan lacus. Nullam urna ante volutpat.
            </div>
          </div>
        </div>

      </div>

    );
  }
}

export default News;