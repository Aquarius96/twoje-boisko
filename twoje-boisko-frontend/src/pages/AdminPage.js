import React, {Component} from 'react';
//import './MainPage.css';
import Spinner from '../components/Spinner';
import AdminNews from '../components/AdminNews';
import AdminObjects from '../components/AdminObjects';
import AdminUsers from '../components/AdminUsers';
import Pagination from '../components/Pagination';
import {
  Link
} from 'react-router';
import '../css/select.css';
import './LoginPage.css';
import '../components/Modal.css';
class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = ({objects: [], news: [], pickedNews:[], dataCollected: false, searchText: "", selectValue: "", wrapperRef: {}, modalRef:{}, currentPage:1});
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
          this.setState({dataCollected: true});
        }, Math.random() * 1500);
        console.log("state of objects", this.state.objects);
      });

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
        this.pickNews();
      });      
  }

  componentDidUpdate(prevProps,prevState){
    console.log(this.state.news.length);
    if(prevState.currentPage != this.props.match.params.page && this.props.match.params.page != undefined){
      this.setState({currentPage:this.props.match.params.page});
      this.pickNews();
    }
    
    //
  }

  

  addObject(e){
    e.preventDefault();
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
        then(response => console.log(response));
  }
 
  handleTextChange(e) {
    this.setState({searchText: e.target.value});
  }
 
  handleSelectChange(e) {
    this.setState({selectValue: e.target.value});
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

  pickNews(){
    var news = [];
    var page = this.state.currentPage;
    console.log("page"+page);
    console.log("news length"+this.state.news.length);
    this.state.news.map(item => {
      if(item.id >= 7*(page-1) && item.id < 7*page)
        news.push(item);
        console.log(item.id);      
    });
    this.setState({pickedNews:news});
  }


  

  render() {
    var hours = [];
    for(var i = 0;i < 25;i++){
      hours.push(i);
    }
    if (this.state.dataCollected) {
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
                    <option value="monday">monday</option>
                    <option value="tuesday">tuesday</option>
                    <option value="wednesday">wednesday</option>
                    <option value="thursday">thursday</option>
                    <option value="friday">friday</option>
                    <option value="saturday">saturday</option>
                    <option value="sunday">sunday</option>
                  </select>
                </div>
                <div class="select selectDays">
                  <select name="selectDaysEnd">
                    <option selected value="">Otwarty do</option>
                    <option value="monday">monday</option>
                    <option value="tuesday">tuesday</option>
                    <option value="wednesday">wednesday</option>
                    <option value="thursday">thursday</option>
                    <option value="friday">friday</option>
                    <option value="saturday">saturday</option>
                    <option value="sunday">sunday</option>
                  </select>
                </div>
                <div class="select ">
                  <select name="selectHoursStart">
                    <option selected value="">Godzina otwarcia</option>
                    {hours.map(item => <option value={item}>{item}</option>)}
                  </select>
                </div>
                <div class="select ">
                  <select name="selectHoursEnd">
                    <option selected value="">Godzina zamknięcia</option>
                    {hours.map(item => <option value={item.toString()}>{item.toString()}</option>)}
                  </select>
                </div>              
                  <input name="city" type="text" placeholder="Miasto"/>
                  <input name="street" type="text" placeholder="Ulica"/>
                  <input name="streetNumber" type="text" placeholder="Nr budynku"/>
                  <input name="priceList" type="text" placeholder="Cennik"/>
                  <input name="contact" type="text" placeholder="Numer kontaktowy"/>
                    <button class="przyciskAdminObiekt" onClick={this.addObject}>Dodaj obiekt</button>
                  </form>
                </div>
              </div>
          
              <AdminObjects
                objects={this.state.objects}
                searchText={this.state.searchText}
                selectValue={this.state.selectValue}/>
            </div>
          )
        case "aktualnosci":
          return <div>
            <p>{this.state.currentPage} {this.state.pickedNews.length}</p>
            <AdminNews update={this.update} news={this.state.pickedNews} page={this.state.currentPage}/>
            <Pagination history={this.props.history} dataLength={this.state.news.length} dataPerPage={6} route="/panelAdmina/aktualnosci/" current ={this.state.currentPage}/>
            </div>
        case "uzytkownicy":
          return <AdminUsers/>
        default:
          return <p>admin</p>
      }
    } else {
      return <Spinner/>
    }

  }
}

export default AdminPage;
