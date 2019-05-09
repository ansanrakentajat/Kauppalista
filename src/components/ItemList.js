import React, { Component } from 'react'
import Item from './Item';
import PropTypes from 'prop-types';
import { Paper, Table, TableBody } from '@material-ui/core';

class ItemList extends Component {

  render() {
    return (
      <React.Fragment>
        <div style={{ width: '90%', margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', paddingBottom: '10vh'}}>

          <Paper style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <h3>KERÄÄMÄTTÖMÄT</h3>
            <Table>
              <TableBody>
                {this.props.stateItemsForItemList.map(item => {
                  let notCollected;
                  if (!item.collected) {
                    notCollected = <Item key={item.id} itemForItem={item} markComplete={this.props.markComplete} deleteItem={this.props.deleteItem} />;
                  }
                  return notCollected;
                }
                )}
              </TableBody>
            </Table>
          </Paper>

          <Paper style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <h3>KERÄTYT</h3>
            <Table>
            <TableBody>
              {this.props.stateItemsForItemList.map(item => {
                let collected;
                if (item.collected) {
                  collected = <Item key={item.id} itemForItem={item} markComplete={this.props.markComplete} deleteItem={this.props.deleteItem} />
                }
                return collected;
              }
              )}
              </TableBody>
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
