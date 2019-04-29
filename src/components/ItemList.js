import React, { Component } from 'react'
import Item from './Item';
import PropTypes from 'prop-types';
import { Paper, Table } from '@material-ui/core';

class ItemList extends Component {

  render() {
    return (
      <React.Fragment>
        <div style={{ width: '90%', margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>

          <Paper style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>OSTOSLISTA</h3>
            <Table>
              {this.props.stateItemsForItemList.map(item => {
                let notCollected;
                if (!item.collected) {
                  notCollected = <Item key={item.id} itemForItem={item} markComplete={this.props.markComplete} deleteItem={this.props.deleteItem} />;
                }
                return notCollected;
              }
              )}
            </Table>
          </Paper>

          <Paper style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>KERÄTYT</h3>
            <Table>
              {this.props.stateItemsForItemList.map(item => {
                let collected;
                if (item.collected) {
                  collected = <Item key={item.id} itemForItem={item} markComplete={this.props.markComplete} deleteItem={this.props.deleteItem} />
                }
                return collected;
              }
              )}
            </Table>
          </Paper>

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
