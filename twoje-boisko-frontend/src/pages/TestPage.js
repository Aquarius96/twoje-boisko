import React, { Component } from 'react'
import axios from 'axios';

export default class TestPage extends Component {
    constructor(props) {
        super(props);
        this.state = {file: null, imagePreviewUrl: null};
    }
    

    handleImageChange = (e) => {            
        const reader = new FileReader();
        const file = e.target.files[0];    
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }    
        reader.readAsDataURL(file);
    }

    addAvatar = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file);
        axios.post('http://localhost:8080/photo/post/1', formData)
        .then(res => console.log(res))
        .catch(err => console.log(err.response.data))        
    }

    

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} height="360"/>);
    } else {
        $imagePreview = (<div className="previewText">Wybierz zdjęcie</div>);
    }

    return (
      <div>
        {$imagePreview}
        <input id="file-upload" 
                        type="file"                    
                        onChange={(e)=>this.handleImageChange(e)} />
        <button onClick={this.addAvatar}>Dodaj</button>
      </div>
    )
  }
}
