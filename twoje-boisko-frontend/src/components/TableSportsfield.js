import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import './TableSportsfield.css';
import '../css/buttons.css';
import '../css/tables.css';
import '../components/Modal.css';
import $ from 'jquery';
import Spinner from './Spinner';
import Pagination from './Pagination';
import axios from 'axios';

class TableSportsfield extends Component {
    constructor(props){
        super(props);
        this.state=({file: null, oldObject: null, currentObject: null, objects:[],pickedObjects:[], dataLength:0, searchText: "", selectValue:"",currentPage:1,dataCollected:false});
        this.sortTable=this.sortTable.bind(this);
        this.switchArrow=this.switchArrow.bind(this);
        this.componentDidMount=this.componentDidMount.bind(this);
        this.pickObjects=this.pickObjects.bind(this);
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
      this.delete=this.delete.bind(this);      
    }

    componentDidMount(){
      var page = this.props.page;
    console.log("this is my "+page);
    if(page == undefined){
      console.log("xundefined");
      //this.setState({currentPage:1});
    }
    else{
      console.log("xnieundefined");
      this.setState({currentPage:page});
    }
      this.setState({objects:this.props.objects,dataLength:this.props.objects.length});
      console.log("this props objects length"+this.props.objects.length);
      console.log("this state objects length"+this.state.dataLength);
      this.pickObjects(10);
    }

    componentDidUpdate(prevProps,prevState){
      console.log(this.state.objects.length);
      if(prevState.currentPage != this.props.page && this.props.page != undefined || prevState.searchText != this.props.searchText || prevState.selectValue != this.props.selectValue || prevState.objects!=this.props.objects){
        this.setState({currentPage:this.props.page,searchText:this.props.searchText,selectValue:this.props.selectValue,dataCollected:false,dataLength:14,objects:this.props.objects});
        console.log("this data length"+this.state.dataLength);
        this.pickObjects(10);
      }
      
      //
    }

    delete(objectId){
      console.log("objectid"+objectId);
  fetch('http://localhost:8080/object/delete', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
            body: JSON.stringify({
             id:objectId
            })
          })
          .then(result => result.json()).
          then(response => {
            console.log(response);
            this.props.update();
          });
    }

    pickObjects(itemCount){
      console.log("wybieram");
      console.log(this.props.searchText);
      var objects = [];
      var page = this.state.currentPage;
      var pagesCount = 0;
      var counter = 0;
  
      this.props.objects.map(item => {
        if((item.name.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1 || item.city.toLowerCase().indexOf(this.state.searchText.toLowerCase())) !== -1 && (item.type === this.props.selectValue.toLowerCase()|| this.state.selectValue.length ===0)){
          if(counter == 0){
            objects[pagesCount]=[];
            objects[pagesCount].push(item);
            counter++;
          }
          else if(counter < itemCount){        
            objects[pagesCount].push(item);
            counter++;
          }
          else{
            pagesCount++;
            counter = 0;
            objects[pagesCount]=[];
            objects[pagesCount].push(item);        
            counter++;
          }
        }
        
        
              
      });
      var dataCounter = 0;
      for(var i=0;i< objects.length;i++){
        for(var j =0;j<objects[i].length;j++){
          dataCounter++;
        }
      }
      console.log("data counter"+dataCounter);
      this.setState({dataCollected:true,dataLength:dataCounter});
      console.log("data length:"+this.state.dataLength);
      console.log("ale nie ma");
      if(objects[page-1]){
        this.setState({pickedObjects:objects[page-1]});
      }
      else{
        this.setState({pickedObjects:[]});
        if(this.state.currentPage>1){
          this.props.history.push(this.props.route+(this.state.currentPage-1))
        }
      }
      
    }

    switchArrow(id){
      if ($('#'+id).hasClass('fa-arrow-up')){
        $('#'+id).toggleClass('fas fa-arrow-down');
      }
      else{
        $('#'+id).toggleClass('fas fa-arrow-up');
      }
      
    }

    

    validateObjectData = () => {
      console.log('validate obj data');
      const obj = document.editObjectForm;
      var stringPattern = /^[a-zA-Z0-9]/;    
      var openHoursBool = document.editObjectForm.selectHoursStart.value < document.editObjectForm.selectHoursEnd.value;
      var numberPattern = /^[0-9]/;
      var phonePattern = /^[0-9]{9,}/;
  
      var objName = document.editObjectForm.nazwa.value;    
      var objCity = document.editObjectForm.city.value;
      var objStreet = document.editObjectForm.street.value;
      var objStreetNumber = document.editObjectForm.streetNumber.value;
      var objPrice = document.editObjectForm.priceList.value;
      var objContact = document.editObjectForm.contact.value;
        
      if(objName.length > 0 && !stringPattern.test(objName)){
        window.alert("Wpisz poprawną nazwę obiektu");
        return false;
      }
      if(objCity.length > 0 && !stringPattern.test(objCity)){
        window.alert("Wpisz poprawne miasto");
        return false;
      }
      if(document.editObjectForm.selectHoursStart.value.length > 0 && document.editObjectForm.selectHoursEnd.value.length > 0 && !openHoursBool){
        window.alert('Podaj poprawne godziny otwarcia');
        return false;
      }
      return true;
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

    handleSubmit = (e) => {
      e.preventDefault();
      const newObj = {};
      newObj.name = this.state.currentObject.name;
      newObj.type = this.state.currentObject.type;
      newObj.city = this.state.currentObject.city;
      newObj.street = this.state.currentObject.street;
      newObj.streetNumber = this.state.currentObject.streetNumber;
      newObj.priceList = this.state.currentObject.priceList;
      newObj.contact = this.state.currentObject.contact;
      newObj.openDays = (this.state.currentObject.dayStart && this.state.currentObject.dayEnd) ? this.state.currentObject.dayStart+"-"+this.state.currentObject.dayEnd : this.state.oldObject.openDays;
      newObj.openHours = (this.state.currentObject.hourStart && this.state.currentObject.hourEnd) ? this.state.currentObject.hourStart+"-"+this.state.currentObject.hourEnd : this.state.oldObject.openHours;
      const finalObject = Object.assign(this.state.oldObject, newObj);
      console.log('final obj');
      console.log(finalObject);
      axios.post('http://localhost:8080/object/update', finalObject)
      .then(res => {
        console.log(res.data);
        if(this.state.file) {
          this.addAvatar(res.data.id);
        }
        window.alert('Pomyślnie zaktualizowano obiekt');
        this.props.update();
      })
      .catch(err => console.log(err.response.data))
      this.closeModal();
    }

    handleDataChange = (e) => {
      console.log('handling');
      const object = Object.assign({}, this.state.currentObject);
      if(e.target.value.length > 0) {
        object[e.target.name] = e.target.value;
        this.setState({currentObject: object});
        console.log(object);
      } else {
        object[e.target.name] = this.state.oldObject[e.target.name];
        this.setState({currentObject: object});
      }
    }
    
    openModal(item) {
      this.setState({currentObject: item, oldObject: item});
      console.log(item.id);
      document.addEventListener('mousedown', this.handleClickOutside);
      this.setWrapperRef(item.id);
      var modal = document.getElementById(item.id);    
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

    sortTable(n){
      this.switchArrow(n);
      var table, rows, switching, i, x, y, shouldSwitch, asc, switchcount = 0;
      table = document.getElementsByClassName("myTable");
      table = table[0];
      rows = table.getElementsByTagName("TR");
      switching = true;
      asc = true; 
      while (switching) {
        switching = false;
        rows = table.getElementsByTagName("TR");
        for (i = 1; i < (rows.length - 1); i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];
          if (asc) {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch= true;
              break;
            }
          } else if (!asc) {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              shouldSwitch= true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          switchcount ++; 
        } else {
          if (switchcount === 0 && asc) {
            asc = false;
            switching = true;
          }
        }
      }
    }
    render() {
      var hours = [];
    for(var i = 0;i < 25;i++){
      hours.push(i);
    }
      if(this.state.dataCollected){
        if(this.state.pickedObjects.length > 0){
          if(this.props.showAdmin){
            return (
              <div class="tableContainer">
        
                <table class="myAdminObjectTable">
                  <tr class="header myRow">
                    <th class="nazwa">Nazwa Boiska
                    </th>
                    <th class="miasto">Adres
                    </th>
                    <th class="przycisk"></th>
                  </tr>
                  {this
                    .state
                    .pickedObjects
                    .map(item => {
                      if ((item.name.toLowerCase().indexOf(this.props.searchText.toLowerCase()) !== -1 || item.city.toLowerCase().indexOf(this.props.searchText.toLowerCase())) !== -1 && (item.type === this.props.selectValue.toLowerCase() || this.props.selectValue.length === 0)) {
                        return ([ < tr class = "myRow" > <td>{item.name}</td> < td > {
                            item.city
                          }, {
                            item.street
                          }
                          {
                            item.streetNumber
                          } </td>                   
                            <td><button class="przyciskSzczegoly" onClick ={() => this.openModal(item)}>Edytuj</button > 
                            <button class="przyciskUsunObiekt" onClick ={() => this.delete(item.id)}>Usuń</button ></td> 
                            <tr colSpan="3"><div class="modal" id={item.id}>
                <div class="wrapper">
                  <form class="message" name="editObjectForm" onChange={this.handleDataChange}>
                  <h1>Edytuj obiekt</h1>
                  <input name="name" type="text" placeholder={item.name}/>
                  <div class="select">
                  <select name="type">
                    <option selected value="">Typ: {item.type}</option>
                    <option value="orlik">orlik</option>
                    <option value="stadion">stadion</option>
                  </select>
                </div>
                  <div class="select selectDays">
                  <select name="dayStart">
                    <option selected value="">Otwarty od: {item.openDays.split("-")[0]}</option>
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
                  <select name="dayEnd">
                    <option selected value="">Otwarty od: {item.openDays.split("-")[1]}</option>
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
                  <select name="hourStart">
                    <option selected value="">Godzina otwarcia: {item.openHours.split("-")[0]}</option>
                    {hours.map(item => <option value={item}>{item}.00</option>)}
                  </select>
                </div>
                <div class="select ">
                  <select name="hourEnd">
                    <option selected value="">Godzina zamknięcia: {item.openHours.split("-")[1]}</option>
                    {hours.map(item => <option value={item.toString()}>{item.toString()}.00</option>)}
                  </select>
                </div>              
                  <input name="city" type="text" placeholder={item.city}/>
                  <input name="street" type="text" placeholder={item.street}/>
                  <input name="streetNumber" type="text" placeholder={item.streetNumber}/>
                  <input name="priceList" type="text" placeholder={item.priceList}/>
                  <input name="contact" type="text" placeholder={item.contact}/>
                  <label htmlFor="file-upload" className="custom-file-upload ">Wybierz plik</label>
                  {this.state.file ? this.state.file.name : null}
                  <input id="file-upload" 
                        type="file"                    
                        onChange={(e)=>this.handleImageChange(e)} />
                    <button type="button" class="przyciskAdminObiekt" onClick={this.handleSubmit}>Edytuj</button>
                  </form>
                </div>
              </div></tr >
                            </tr>,
                        
                        
                        ]);
                      }
                    })}
                </table>
                
                <Pagination history={this.props.history} dataLength={this.state.dataLength} dataPerPage={10} route="/panelAdmina/obiekty/" current ={this.state.currentPage}/>
              </div>
            );
          }
          return (
            <div class="tableContainer">
                  <table class="myTable">
                      <tr class="header">
                          <th onClick={() => this.sortTable(0)}class ="nazwa">Nazwa Boiska <i id="0"class="fas fa-arrow-up"></i></th>
                          <th onClick={() => this.sortTable(1)}class ="miasto">Adres <i id="1"class="fas fa-arrow-up"></i></th>
                          <th class ="przycisk"></th>    
                      </tr>
                      {this.state.pickedObjects.map(item =>{
                       
                          return (
                      <tr>
                          <td>{item.name}</td>
                          <td>{item.city}, {item.street} {item.streetNumber}</td>                   
                          <td><Link to={"/object/"+item.id}><button class="przyciskSzczegoly">Szczegóły</button></Link></td>
                      </tr>
                          );
                        }
                      
                       
                      )}
              </table>                           
              <Pagination history={this.props.history} dataLength={this.state.dataLength} dataPerPage={10} route="/listaBoisk/" current ={this.state.currentPage}/>
            </div>
          );
        }
        else return <p>Brak wyników</p>
        
      }
      else return <Spinner />
    
  }
}

export default TableSportsfield;