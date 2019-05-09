import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Button} from '@material-ui/core';
import {upload, uploadTag} from '../util/MediaAPI';

//tyhjä description
const luuranko = {
  pantry: [],
  shoppingList: {
    items: []
  }
};

class Profilepic extends Component {

  state = {
    user: this.props.user,
    file: {
      title: '',
      description: '',
      filedata: null,
      filename: undefined,
    },
    loading: false,
  };

  componentDidMount() {
    if (this.props.stateForLoggedIn.user === null) {
      console.log('ET OLE KIRJAUTUNUT! SINUT SIIRRETÄÄN LOGIN-SIVULLE.');
      this.props.history.push('/');
    } else {
      console.log('AI OLITKIN JO KIRJAUTUNUT.');
    }
  }

  handleFileChange = (evt) => {
    evt.persist();
    console.log(evt.target.files[0]);
    this.setState((prevState) => ({
      file: {
        ...prevState.file,
        filedata: evt.target.files[0],
      },
    }));
  };

  handleInputChange = (evt) => {
    const target = evt.target;
    const value = target.value;
    const name = target.name;

    console.log(value, name);

    this.setState((prevState) => ({
      file: {
        ...prevState.file,
        [name]: value,
      },
    }));
  };

  handleFileSubmit = (evt) => {
    console.log(evt);
    this.setState({loading: true});
    const fd = new FormData();
    fd.append('title', this.state.file.title);
    fd.append('description', JSON.stringify(luuranko));
    fd.append('file', this.state.file.filedata);

    /* const options = {
       method: 'POST',
       body: fd,
       headers: {
         'x-access-token': localStorage.getItem('token'),
       },
     };

     const upload = (data, token)=>{
  const options ={
      method: 'POST',
    body: data,
    headers:{
          'x-access-token': token,
    },
  };
   return fetch(apiUrl + 'media', options).then(response =>{
       return response.json();
   });
};
     */
    upload(fd, localStorage.getItem('token2')).then(json => {
      console.log(json);
      const copy = { ...json };
      console.log('copyyy: ' + copy);
      setTimeout(() => {
        const tagData = {
          file_id: copy.file_id,
          tag: 'profile'
        };
        uploadTag(tagData,localStorage.getItem('token2')).then(tagjson => {
          console.log(tagjson);
          setTimeout(() => {
            //sendtodescription
            //this.props.sendToDescription(luuranko);
           // this.props.history.push('/ostoslista');
            this.props.setUser(this.props.stateForLoggedIn.user);
            this.setState({loading: false});
            this.props.history.push('/ostoslista');
          }, 2000);
        });
      }, 2000);
    });
  };

  render() {

    return (
        <React.Fragment>
          <h1>Lisää profiilikuva</h1>
          <ValidatorForm instantValidate={false}
                         onSubmit={this.handleFileSubmit}
                         onError={errors => console.log(errors)}>
            <TextValidator name="title" label="Title"
                           value={this.state.file.title}
                           onChange={this.handleInputChange}
                           validators={['required', 'minStringLength:3']}
                           errorMessages={[
                             'this field is required',
                             'minimum 3 charaters']}
                           fullWidth/>
            <TextValidator name="filedata" label="File"
                           value={this.state.file.filename}
                           type="file"
                           onChange={this.handleFileChange}
                           fullWidth/>
            <Button type="submit" variant="contained"
                    color="primary">Upload&nbsp;{this.state.loading &&
            'Loading...'}</Button>
          </ValidatorForm>
        </React.Fragment>
    );
  }
}


Profilepic.propTypes = {
  user: PropTypes.object,
  history: PropTypes.object,
  stateForLoggedIn: PropTypes.object.isRequired,
  sendToDescription: PropTypes.func,
};

export default Profilepic;

