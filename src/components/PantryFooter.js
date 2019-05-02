import React, { Component } from 'react';

class PantryFooter extends Component {

    render() {
        return (
            <React.Fragment>
                <div style={footerStyle}>
                    <h1>tämä on musta palkki</h1>
                </div>
            </React.Fragment>
        )
    }
}

const footerStyle = {
    width: '100%',
    height: '10vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    position: 'absolute',
    bottom: '0'
};

export default PantryFooter
