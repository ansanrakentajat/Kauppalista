import React, { Component } from 'react';

class PantryFooter extends Component {

    render() {
        return (
            <React.Fragment>
                <div style={footerStyle}>
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
};

export default PantryFooter
