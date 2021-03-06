import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Avatar, Tooltip, IconButton, TableRow, TableCell } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import ContentEditable from 'react-contenteditable';


class PantryItem extends Component {

  handleTitleChange = (e) => {
    const changedTitle = e.target.innerHTML;
    this.props.changePantryTitle.bind(this, this.props.elementToPantryItem.id);
    this.props.changePantryTitle(changedTitle, this.props.elementToPantryItem.id);
  }


  render() {
    return (
      <React.Fragment>
        <TableRow>
          <TableCell style={tableCellStyle}>
            <ContentEditable html={this.props.elementToPantryItem.title} onBlur={this.handleTitleChange} />
          </TableCell>
          <TableCell style={tableCellStyle}>{this.props.elementToPantryItem.amount} {this.props.elementToPantryItem.unit}</TableCell>
          <TableCell style={tableCellStyle}>{this.props.elementToPantryItem.dateAdded}</TableCell>
          <TableCell style={{padding: '1vw', textAlign: 'center'}}>
            <IconButton onClick={this.props.deletePantryItem.bind(this, this.props.elementToPantryItem.id)}>
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

const tableCellStyle = {
  padding: '1vw',
};
PantryItem.propTypes = {
  elementToPantryItem: PropTypes.object,
  deletePantryItem: PropTypes.func
};

export default PantryItem
