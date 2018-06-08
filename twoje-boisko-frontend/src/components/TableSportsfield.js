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

class TableSportsfield extends Component {
    constructor(props){
        super(props);
        this.state=({objects:[],pickedObjects:[], dataLength:0, searchText: "", selectValue:"",currentPage:1,dataCollected:false});
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
      this.editObject=this.editObject.bind(this);
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

    editObject(id){
      
    }

    validateObjectData(data){
      const obj = document.objectForm;
      var phonePattern = /^[0-9]{9,}/;
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
                            <td><button class="przyciskSzczegoly" onClick ={() => this.openModal(item.id)}>Edytuj</button > 
                            <button class="przyciskUsunObiekt" onClick ={() => this.delete(item.id)}>Usuń</button ></td> 
                            <tr colSpan="3"><div class="modal" id={item.id}>
                <div class="wrapper">
                  <form class="message" name="objectForm">
                  <h1>Edytuj obiekt</h1>
                  <input name="nazwa" type="text" placeholder={item.name}/>
                  <div class="select">
                  <select name="selectType">
                    <option selected value="">Typ: {item.type}</option>
                    <option value="orlik">orlik</option>
                    <option value="stadion">stadion</option>
                  </select>
                </div>
                  <div class="select selectDays">
                  <select name="selectDaysStart">
                    <option selected value="">Otwarty od: {item.openDays.split("-")[0]}</option>
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
                    <option selected value="">Otwarty od: {item.openDays.split("-")[1]}</option>
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
                    <option selected value="">Godzina otwarcia: {item.openHours.split("-")[0]}</option>
                    {hours.map(item => <option value={item}>{item}</option>)}
                  </select>
                </div>
                <div class="select ">
                  <select name="selectHoursEnd">
                    <option selected value="">Godzina zamknięcia: {item.openHours.split("-")[1]}</option>
                    {hours.map(item => <option value={item.toString()}>{item.toString()}</option>)}
                  </select>
                </div>              
                  <input name="city" type="text" placeholder={item.city}/>
                  <input name="street" type="text" placeholder={item.street}/>
                  <input name="streetNumber" type="text" placeholder={item.streetNumber}/>
                  <input name="priceList" type="text" placeholder={item.priceList}/>
                  <input name="contact" type="text" placeholder={item.contact}/>
                    <button class="przyciskAdminObiekt" onClick={() => this.editObject(item)}>Edytuj</button>
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