import React, {Component} from 'react';
import './News.css';
import axios from 'axios';
import moment from 'moment';

class News extends Component {
 constructor(props){
   super(props);
   this.state=({currentNews: null, wrapperRef:{},modalRef:{}});
   this.openModal = this
      .openModal
      .bind(this);
    this.closeModal = this
      .closeModal
      .bind(this);
    this.setWrapperRef = this
      .setWrapperRef
      .bind(this);
    this.handleClickOutside = this
      .handleClickOutside
      .bind(this);
    this.deleteNews = this
      .deleteNews
      .bind(this);
 }

 componentDidMount(){

 }

 deleteNews(e) {
  fetch('http://localhost:8080/news/delete', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
      body: JSON.stringify({id: e})
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      this.props.update();
    });
}
 setWrapperRef(id) {
  var modal = document.getElementById(id);
  console.log(modal);
  var wrapper = document.getElementById(id).children[0];
  console.log(wrapper);
  this.setState({
    wrapperRef: wrapper, modalRef:modal
  }, console.log("m " + wrapper));
}

handleClickOutside(event) {
  if (this.state.wrapperRef && !this.state.wrapperRef.contains(event.target)) {
    this.closeModal();
  }
}

openModal(id) {  
  console.log(id);
  document.addEventListener('mousedown', this.handleClickOutside);
  this.setWrapperRef(id);
  var modal = document.getElementById(id);    
  modal
    .classList
    .add("display");
  setTimeout(function () {
    modal
      .classList
      .add("transition");
  }, 20); //20milliseconds
}

closeModal() {
  document.removeEventListener('mousedown', this.handleClickOutside);
  var modal = this.state.modalRef;
  modal
    .classList
    .remove("transition");
  setTimeout(function () {
    //timeout before removing modal, so that animations have time to play out.
    modal
      .classList
      .remove("display");
  }, 200); //0.3s
}

handleChange = (e) => {
  const news = Object.assign({}, this.state.currentNews);
  news.id = this.props.id;
  news.date = this.props.date;
  if(e.target.value.length > 0){
    if(e.target.name === 'header'){
      console.log('upd header');
      news.header = e.target.value;
    }
    if(e.target.name === 'text'){
      console.log('upd text');
      news.text = e.target.value;
    }
  }
  this.setState({currentNews: news});
}

handleSubmit = (e) => {
  e.preventDefault();
  const news = Object.assign({}, this.state.currentNews);
  if(!this.state.currentNews.header){
    news.header = this.props.header;
  }
  if(!this.state.currentNews.text){
    news.text = this.props.text;
  }
  if(this.state.currentNews){
    axios.post('http://localhost:8080/news/update', news)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err.response.data))
  }
  this.closeModal();
  this.props.update();
}

 render() {
   if(this.props.showAdmin){
     return (
       <div class="news">
          <div class="admincard card">
            <div class="content">
             <div class="title">
               <p>{this.props.header}</p>
             </div>
             <div class="separator"></div>
             <div class="text">
               {this.props.text}
             </div>
             <div class="separator2"></div>
             <div class="ustawieniePrzyciskuEdytuj">
             <button class="przyciskEdytujAktualnosc" onClick={() =>this.openModal(this.props.id)}>Edytuj</button>
             </div>
             <div class="ustawieniePrzyciskuUsun">
             <button class="przyciskUsunAktualnosc" onClick={() => this.deleteNews(this.props.id)}>Usuń</button>
             </div>
           </div>
         </div>
         <div class="modal" id={this.props.id}>
         <div class="wrapper">
            <form name="addNews" class="message" onChange={this.handleChange}>
              <h1>Edytuj aktualność</h1>
              <input name="header" type="text" placeholder="Tytuł"/>
              <textarea
                name="text"
                className="textarea"
                type="text"
                placeholder="Treść..."></textarea>
              <button class="przyciskAdminObiekt" onClick={this.handleSubmit}>Zapisz zmiany</button>
            </form>
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
             <p>{this.props.header}</p>
           </div>
           <div class="separator"></div>
           <div class="text">
           {this.props.text}
           </div>
         </div>
       </div>
     </div>

   );
 }
}

export default News;
