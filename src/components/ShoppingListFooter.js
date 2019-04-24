import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';


class ShoppingListFooter extends Component {
  render() {
    return (
      <React.Fragment>
        <div style={footerStyle}>
          <button onClick={this.props.addToPantry}>Lisää ostoslistan tavarat ruokakomeroon</button>
          <Button style={buttonStyle} onClick={this.props.sendToDescription}>Save</Button>
          <Button style={buttonStyle} onClick={this.props.fetchFromDescription}>Fetch state from description</Button>
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

const buttonStyle = {
  color: '#fff'
};

ShoppingListFooter.propTypes = {
  addToPantry: PropTypes.func.isRequired,
  sendToDescription: PropTypes.func.isRequired,
  fetchFromDescription: PropTypes.func.isRequired
}

export default ShoppingListFooter
