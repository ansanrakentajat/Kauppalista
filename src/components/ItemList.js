import React, { Component } from 'react'
import Item from './Item';
import PropTypes from 'prop-types';

class ItemList extends Component {
  render() {
    return (
      <React.Fragment>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {this.props.stateItemsForItemList.map(item => (
            <Item key={item.id} itemForItem={item} markComplete={this.props.markComplete}/>
          ))}
        </div>
      </React.Fragment>



    )



  }
}

ItemList.propTypes = {
  stateItemsForItemList: PropTypes.array.isRequired
}

export default ItemList
