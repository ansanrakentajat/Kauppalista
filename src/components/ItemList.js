import React, { Component } from 'react'
import Item from './Item';
import PropTypes from 'prop-types';

class ItemList extends Component {
  render() {
      console.log(this.props.stateItemsForItemList, 'hello from item list');
      
    return this.props.stateItemsForItemList.map(item => (
        <Item key={item.id} itemForItem={item}/>
    ));
  }
}

ItemList.propTypes = {
    stateItemsForItemList: PropTypes.array.isRequired
}

export default ItemList
