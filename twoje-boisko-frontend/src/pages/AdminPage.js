import React, {Component} from 'react';
import Spinner from '../components/Spinner';
import AdminNews from '../components/AdminNews';
import Pagination from '../components/Pagination';
import TableSportsfield from '../components/TableSportsfield';
import {
  Link
} from 'react-router';
import '../css/select.css';
import './LoginPage.css';
import '../components/Modal.css';
import axios from 'axios';
class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = ({file: null, objects: [], news: [], pickedNews:[], dataCollected: false,objectsCollected:false, reservationsCollected:false, searchText: "", selectValue: "", wrapperRef: {}, modalRef:{}, currentPage:1});
    this.handleTextChange = this
      .handleTextChange
      .bind(this);
    this.handleSelectChange = this
      .handleSelectChange
      .bind(this);
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
      this.pickNews=this.pickNews.bind(this);
      this.addObject=this.addObject.bind(this);
      this.fetchObjects=this.fetchObjects.bind(this);
      this.fetchNews=this.fetchNews.bind(this);
      this.updateNews=this.updateNews.bind(this);
      this.updateObjects=this.updateObjects.bind(this);
      
  }
  // ma byc spinner dopoki nie przyjdzie response z backendu czy kod jest poprawny
  componentDidMount() {

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
    
    this.fetchObjects();
    this.fetchNews();

       
  }

  componentDidUpdate(prevProps,prevState){
    console.log(this.state.news.length);
    if(prevState.currentPage != this.props.match.params.page && this.props.match.params.page != undefined){
      this.setState({currentPage:this.props.match.params.page});
      this.pickNews(6);
    }
    
    //
  }

  handleImageChange = (e) => {            
    const reader = new FileReader();
    const file = e.target.files[0];    
    reader.onloadend = () => {
        this.setState({
            file: file            
        });
    }    
    reader.readAsDataURL(file);
}

addAvatar = (id) => {    
    const formData = new FormData();
    formData.append('file', this.state.file);
    axios.post('http://localhost:8080/photo/post/'+id, formData)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))        
}

  fetchObjects(){
    fetch(`http://localhost:8080/object/allObjects`, {mode: 'cors'})
    .then(response => response.json())
    .then(data => {
      var dataTab = [];
      Object
        .keys(data)
        .forEach(function (key) {
          dataTab.push(data[key]);
        });
      this.setState({objects: dataTab});
      setTimeout(() => {
        this.setState({objectsCollected: true});
      }, Math.random() * 1500);
      console.log("state of objects", this.state.objects);
    });
  }
  fetchNews(){
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
          this.setState({newsCollected: true});
        }, Math.random() * 1500);
        console.log("state of news", this.state.news);
        this.pickNews(6);
      });     
  }

  updateNews(){
    this.fetchNews();
  }

  updateObjects(){
    this.fetchObjects();
  }
  
  validateObjectData = () => {
    console.log('validate obj data');
    const obj = document.addObjectForm;
    var stringPattern = /^[a-zA-Z]/;    
    var stringNumberPattern = /^[a-zA-Z0-9]/;
    var openHoursBool = document.addObjectForm.selectHoursStart.value < document.addObjectForm.selectHoursEnd.value;
    var numberPattern = /^[0-9]/;
    var phonePattern = /^[0-9]{9,}/;

    var objName = document.addObjectForm.nazwa.value;    
    var objCity = document.addObjectForm.city.value;
    var objStreet = document.addObjectForm.street.value;
    var objStreetNumber = document.addObjectForm.streetNumber.value;
    var objPrice = document.addObjectForm.priceList.value;
    var objContact = document.addObjectForm.contact.value;

    if(objName == "" || objCity == "" || objStreet == "" || objStreetNumber == "" || objPrice == "" || objContact == "" || document.addObjectForm.selectDaysStart.value.length === 0 || document.addObjectForm.selectDaysEnd.value.length === 0) {
      window.alert("Proszę wypełnić wszystkie pola z danymi obiektu");
      return false;
    }
    if(!stringPattern.test(objName)){
      window.alert("Wpisz poprawną nazwę obiektu");
      return false;
    }
    if(!stringPattern.test(objCity)){
      window.alert("Wpisz poprawne miasto");
      return false;
    }
    if(!openHoursBool){
      window.alert('Podaj poprawne godziny otwarcia');
      return false;
    }
    
    return true;
  }

  addObject(e){
    e.preventDefault();    
    if(this.validateObjectData()){
      this.closeModal();
      fetch('http://localhost:8080/object/add', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
          body: JSON.stringify({
            name: document.addObjectForm.nazwa.value,
            type: document.addObjectForm.selectType.value,
            openDays: document.addObjectForm.selectDaysStart.value+"-"+document.addObjectForm.selectDaysEnd.value,
            openHours: document.addObjectForm.selectHoursStart.value+"-"+document.addObjectForm.selectHoursEnd.value,
            city: document.addObjectForm.city.value,
            street: document.addObjectForm.street.value,
            streetNumber: document.addObjectForm.streetNumber.value,
            priceList: document.addObjectForm.priceList.value,
            contact: document.addObjectForm.contact.value
          })
        })
        .then(result => result.json()).
        then(response => {
          if(this.state.file){
            this.addAvatar(response.id);
          }         
          console.log(response);
          this.updateObjects();
        });
    }    
  }
 
  handleTextChange(e) {
    this.setState({searchText: e.target.value});
    this.props.history.push("/panelAdmina/obiekty/1");
  }
 
  handleSelectChange(e) {
    this.setState({selectValue: e.target.value});
    this.props.history.push("/panelAdmina/obiekty/1");
  }
  
  setWrapperRef(id) {
    var modal = document.getElementById(id);
    var wrapper = document.getElementById(id).children[0];
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
    var hours = [];
    for(var i = 0;i < 25;i++){
      hours.push(i);
    }
    if (this.state.objectsCollected && this.state.newsCollected) {
      switch (this.props.match.params.url) {
        case "obiekty":
        
          return (
            <div>
              <div className="ustawienieInputa">
                <input
                  type="text"
                  id="myInput"
                  placeholder="Wyszukaj obiekt..."
                  title="Wpisz miasto"
                  onChange={this.handleTextChange}></input>
              </div>

              <div className="ustawienieSelecta">
                <div class="select">
                  <select name="selectMenu" onChange={this.handleSelectChange}>
                    <option selected value="">Wybierz typ obiektu</option>
                    <option value="orlik">orlik</option>
                    <option value="stadion">stadion</option>
                  </select>
                </div>
              </div>
              <button className="przyciskDodajObiekt " onClick={() =>this.openModal("modal")}>Dodaj obiekt</button>
              <div class="modal" id="modal">
                <div class="wrapper">
                  <form class="message" name="addObjectForm">
                  <h1>Dodaj obiekt</h1>
                  <input name="nazwa" type="text" placeholder="Nazwa obiektu"/>
                  <div class="select">
                  <select name="selectType">
                    <option selected value="">Wybierz typ obiektu</option>
                    <option value="orlik">orlik</option>
                    <option value="stadion">stadion</option>
                  </select>
                </div>
                  <div class="select selectDays">
                  <select name="selectDaysStart">
                    <option selected value="">Otwarty od</option>
                    <option value="poniedziałek">poniedziałek</option>
                    <option value="wtorek">wtorek</option>
                    <option value="środa">środa</option>
                    <option value="czwartek">czwartek</option>
                    <option value="piątek">piątek</option>
                    <option value="sobota">sobota</option>
                    <option value="niedziela">niedziela</option>
                  </select>
                </div>
                <div class="select selectDays">
                  <select name="selectDaysEnd">
                    <option selected value="">Otwarty do</option>
                    <option value="poniedziałek">poniedziałek</option>
                    <option value="wtorek">wtorek</option>
                    <option value="środa">środa</option>
                    <option value="czwartek">czwartek</option>
                    <option value="piątek">piątek</option>
                    <option value="sobota">sobota</option>
                    <option value="niedziela">niedziela</option>
                  </select>
                </div>
                <div class="select ">
                  <select name="selectHoursStart">
                    <option selected value="">Godzina otwarcia</option>
                    {hours.map(item => <option value={item}>{item}.00</option>)}
                  </select>
                </div>
                <div class="select ">
                  <select name="selectHoursEnd">
                    <option selected value="">Godzina zamknięcia</option>
                    {hours.map(item => <option value={item.toString()}>{item.toString()}.00</option>)}
                  </select>
                </div>              
                  <input name="city" type="text" placeholder="Miasto"/>
                  <input name="street" type="text" placeholder="Ulica"/>
                  <input name="streetNumber" type="text" placeholder="Nr budynku"/>
                  <input name="priceList" type="text" placeholder="Cennik"/>
                  <input name="contact" type="text" placeholder="Numer kontaktowy"/>
                  <label htmlFor="file-upload" className="custom-file-upload ">Wybierz plik</label>
                  {this.state.file ? this.state.file.name : null}
                  <input id="file-upload" 
                        type="file"                    
                        onChange={(e)=>this.handleImageChange(e)} />
                    <button class="przyciskAdminObiekt" onClick={this.addObject}>Dodaj obiekt</button>
                  </form>
                </div>
              </div>
          
              <TableSportsfield
              update={this.updateObjects}
            history={this.props.history}
            objects={this.state.objects}
            searchText={this.state.searchText}
            selectValue={this.state.selectValue}
            showAdmin={true}
            page={this.state.currentPage}
            route="/panelAdmina/obiekty/"/>
            </div>
          )
        case "aktualnosci":        
          return <div>            
            <AdminNews history={this.props.history} update={this.updateNews} news={this.state.pickedNews} page={this.state.currentPage}/>
            <Pagination history={this.props.history} dataLength={this.state.news.length} dataPerPage={6} route="/panelAdmina/aktualnosci/" current ={this.state.currentPage}/>
            </div>        
        default:
          return <p>admin</p>
      }
    } else {
      return <Spinner/>
    }

  }
}

export default AdminPage;
