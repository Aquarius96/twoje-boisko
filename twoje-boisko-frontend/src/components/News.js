import React, {Component} from 'react';
import './News.css';

class News extends Component {
 constructor(props){
   super(props);
   this.state=({wrapperRef:{},modalRef:{}});
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
                  <div class="message">
                  <h1>Dodaj obiekt</h1>
                  <input name="nazwa" type="text" placeholder="Nazwa obiektu"/>
                  <input name="dniotwarcia" type="text" placeholder="Dni otwarcia"/>
                  <input name="godzinyotwarcia" type="time" placeholder="Godziny otwarcia"/>
                  <input name="adres" type="text" placeholder="Adres"/>
                  <input name="cennik" type="text" placeholder="Cennik"/>
                  <input name="kontakt" type="text" placeholder="Kontakt"/>
                    <button class="przyciskAdminObiekt" onClick={this.closeModal}>Dodaj obiekt</button>
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
