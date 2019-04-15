import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Item extends Component {

  getStyle = () => {
    return {
      textDecoration: this.props.itemForItem.collected ? 'line-through' : 'none',
      backgroundColor: '#c4c4c4',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '50%'
    }
  }

 

  render() {
    return (
      <React.Fragment>
        <div style={this.getStyle()}>
          <input type='checkbox' style={inputStyle} onChange={this.props.markComplete.bind(this, this.props.itemForItem.id)}></input>
          <p style={pStyle}>{this.props.itemForItem.amount}</p>
          <p style={pStyle}>{this.props.itemForItem.title}</p>
          <button style={buttonStyle} onClick={this.props.deleteItem.bind(this, this.props.itemForItem.id)}>X</button>
        </div>
      </React.Fragment>
    )
  }
}

Item.propTypes = {
  itemForItem: PropTypes.object.isRequired
}

const inputStyle = {
  width: '20%',
  height: '50px'
};

const pStyle = {
  width: '40%'
};

const buttonStyle = {
  background: '#ff0000',
  color: '#ffffff',
  border: 'none',
  padding: '5px 9px',
  borderRadius: '50%',
  cursor: 'pointer'
};

export default Item
