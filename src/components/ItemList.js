import React, { Component } from 'react'
import Item from './Item';
import PropTypes from 'prop-types';

class ItemList extends Component {
  render() {
    return (
      <React.Fragment>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>OSTOSLISTA</h3>
            {this.props.stateItemsForItemList.map(item => {
              let moi;
              if (!item.collected) {
                moi = <Item key={item.id} itemForItem={item} markComplete={this.props.markComplete} deleteItem={this.props.deleteItem}/>
              }
              return moi;
            }
            )}
          </div>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>KERÄTYT</h3>
            {this.props.stateItemsForItemList.map(item => {
              let tere;
              if (item.collected) {
                tere = <Item key={item.id} itemForItem={item} markComplete={this.props.markComplete} deleteItem={this.props.deleteItem}/>
              }
              return tere;
            }
            )}
          </div>
        </div>
      </React.Fragment>
    )

  }
}

ItemList.propTypes = {
  stateItemsForItemList: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired
}

export default ItemList
