import React, {Component} from 'react';
import NewsTab from '../components/NewsTab';
import News from '../components/News';
import Pagination from '../components/Pagination';
import moment from 'moment';
import '../css/inputs.css';
import Spinner from './Spinner';

class AdminNews extends Component {
  constructor(props) {
    super(props);
    this.state = ({wrapperRef: {}, modalRef: {}, currentPage: "", news: []});
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
    this.addNews = this
      .addNews
      .bind(this);
  }

  componentDidMount() {
    this.setState({currentPage: this.props.page, news: this.props.news});
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.news && this.props.page > 1){
      this.props.history.push("/panelAdmina/aktualnosci/"+(this.props.page-1));
    }
  }

  addNews(e) {
    e.preventDefault();
    this.closeModal();
    fetch('http://localhost:8080/news/add', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({header: document.newnews.title.value, text: document.newnews.text.value, date:moment().format("YYYY-MM-DD hh:mm:ss")})
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
    var wrapper = document
      .getElementById(id)
      .children[0];
    console.log(wrapper);
    this.setState({
      wrapperRef: wrapper,
      modalRef: modal
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
    return (
      <div class="news-tab">
        <button class="przyciskDodajAktualnosc" onClick={() => this.openModal("modal")}>Dodaj aktualność</button>
        {this.props.news ?
          <div class="row">
          {this
            .props
            .news
            .map(item => <div class="col-sm-4"><News
              update={this.props.update}
              id={item.id}
              header={item.header}
              text={item.text}
              date={item.date}
              showAdmin={true}/></div>)}
        </div> : <div>Brak aktualności do wyświetlenia</div>
         }
        
        <div class="modal" id="modal">
          <div class="wrapper">
            <form name="newnews" class="message">
              <h1>Dodaj aktualność</h1>
              <input name="title" type="text" placeholder="Tytuł"/>
              <input className="longText" name="text" type="text" placeholder="Treść"/>
              <button class="przyciskAdminObiekt" onClick={this.addNews}>Dodaj</button>
            </form>
          </div>
        </div>
      </div>

    );
  }
}

export default AdminNews;