import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

class Settings extends Component {

    logout = (evt) => {
        //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        this.props.sendToDescription();
        //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        localStorage.removeItem('token2');
        this.props.setUserLogout(null);
        this.props.history.push('/');
    }

    componentDidMount() {
        if (this.props.stateForLoggedIn.user === null) {
            console.log('ET OLE KIRJAUTUNUT! SINUT SIIRRETÄÄN LOGIN-SIVULLE.');
            this.props.history.push('/');
        } else {
            console.log('AI OLITKIN JO KIRJAUTUNUT.');
        }
    }

    render() {
        return (
            <React.Fragment>
                <h1>Kiitos ja tervetuloa uudestaan.</h1>
                <Button onClick={() => { this.logout() }}>LOGOUT</Button>
            </React.Fragment>
        )
    }
}

Settings.propTypes = {
    setUserLogout: PropTypes.func,
    history: PropTypes.object,
    stateForLoggedIn: PropTypes.object,
    sendToDescription: PropTypes.func
};

export default Settings
