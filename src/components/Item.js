import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Item extends Component {
  render() {
    return (
      <React.Fragment>
          <div style={{ backgroundColor: '#c4c4c4'}}>
          <p>{this.props.itemForItem.amount}</p>
          <h4>{this.props.itemForItem.title}</h4>
          </div>
      </React.Fragment>
    )
  }
}

Item.propTypes = {
    itemForItem: PropTypes.object.isRequired
}

export default Item
