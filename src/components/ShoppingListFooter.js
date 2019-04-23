import React, { Component } from 'react';
import PropTypes from 'prop-types'


class ShoppingListFooter extends Component {
  render() {
    return (
      <React.Fragment>
          <div style={{width: '100vw', height: '20vh', display: 'flex', position: "fixed"}}><button style={{flex: '1'}} onClick={this.props.addToPantry}>Lisää ostoslistan tavarat ruokakomeroon</button></div>
      </React.Fragment>
    )
  }
}

ShoppingListFooter.propTypes = {
    addToPantry: PropTypes.func.isRequired
}

export default ShoppingListFooter
