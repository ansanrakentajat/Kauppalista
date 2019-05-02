import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, Checkbox, IconButton, Tooltip, Avatar } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

class Item extends Component {

  getStyle = () => {
    return {
      //textDecoration: this.props.itemForItem.collected ? 'line-through' : 'none',
    }
  }

  render() {
    return (
      <React.Fragment>
        <TableRow style={this.getStyle()}>
          <TableCell><Checkbox checked={this.props.itemForItem.collected} onChange={this.props.markComplete.bind(this, this.props.itemForItem.id)} /></TableCell>
          <TableCell>{this.props.itemForItem.title}</TableCell>
          <TableCell>{this.props.itemForItem.amount} {this.props.itemForItem.unit}</TableCell>
          <TableCell>
            <IconButton onClick={this.props.deleteItem.bind(this, this.props.itemForItem.id)}>
              <Tooltip title="Delete">
                <Avatar>
                  <Delete />
                </Avatar>
              </Tooltip>
            </IconButton>
          </TableCell>
        </TableRow>
      </React.Fragment>
    )
  }
}

Item.propTypes = {
  itemForItem: PropTypes.object.isRequired,
  markComplete: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired
}


/* <div style={this.getStyle()}>
        <input type='checkbox' checked={this.props.itemForItem.collected} style={inputStyle} onChange={this.props.markComplete.bind(this, this.props.itemForItem.id)}></input>
        <p style={pStyle}>{this.props.itemForItem.amount}</p>
        <p style={pStyle}>{this.props.itemForItem.unit}</p>
        <p style={pStyle}>{this.props.itemForItem.title}</p>
        <Fab ><Clear/></Fab>
      </div> 
      
      const inputStyle = {
width: '20%',
height: '50px'
};
      
// <Button><Fab><Clear/></Fab></Button>
//<button  onClick={this.props.deleteItem.bind(this, this.props.itemForItem.id)}><Fab style={buttonStyle}><Clear/></Fab></button>

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
*/

export default Item
