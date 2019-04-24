import React, { Component } from 'react';
import PropTypes from 'prop-types'


class ShoppingListFooter extends Component {
  render() {
    return (
      <React.Fragment>
        <div style={{ width: '100vw', height: '20vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><button onClick={this.props.addToPantry}>Lisää ostoslistan tavarat ruokakomeroon</button></div>
      </React.Fragment>
    )
  }
}

ShoppingListFooter.propTypes = {
  addToPantry: PropTypes.func.isRequired
}

export default ShoppingListFooter
