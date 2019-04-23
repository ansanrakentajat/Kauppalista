import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

class Settings extends Component {

   

    logout = (evt) => {
        localStorage.removeItem('token2');
        this.props.setUserLogout(null);
        this.props.history.push('/');
    }

    render() {
        return (
            <React.Fragment>
                <h1>moi tere</h1>
                <Button onClick={() => {this.logout()}}>LOGOUT</Button>
            </React.Fragment>
        )
    }
}

Settings.propTypes = {
    setUserLogout: PropTypes.func,
    history: PropTypes.object,
  };


export default Settings
