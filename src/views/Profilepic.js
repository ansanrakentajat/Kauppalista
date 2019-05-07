import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Button} from '@material-ui/core';

class Profilepic extends Component {
  state

  componentDidMount() {
    if (this.props.stateForLoggedIn.user === null) {
      console.log('ET OLE KIRJAUTUNUT! SINUT SIIRRETÄÄN LOGIN-SIVULLE.');
      this.props.history.push('/');
    } else {
      console.log('AI OLITKIN JO KIRJAUTUNUT.');
    }
  }
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/';
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
    fd.append('description', this.state.file.description);
    fd.append('file', this.state.file.filedata);

    const options = {
      method: 'POST',
      body: fd,
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    };

    fetch(this.mediaUrl + 'media', options).then(response => {
      return response.json();
    }).then(json => {
      console.log(json);
      setTimeout(() => {
        this.props.history.push('/home');
        this.props.getMedia();
        this.setState({loading: false});
      }, 2000);

    });
  };

    render() {
      {console.log(this.props.user)}

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
            <TextValidator name="description" label="Description"
                           value={this.state.file.description}
                           onChange={this.handleInputChange}
                           validators={['required', 'minStringLength:3']}
                           errorMessages={[
                             'this field is required',
                             'minimum 3 charaters']}
                           fullWidth
                           multiline
                           rows={3}/>
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
};

export default Profilepic;
