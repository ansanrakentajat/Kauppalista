import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Pantry extends Component {

  componentDidMount() {
    if (this.props.stateToPantry.user === null) {
      console.log('ET OLE KIRJAUTUNUT! SINUT SIIRRETÄÄN LOGIN-SIVULLE.');
      this.props.history.push('/');
    } else {
      console.log('AI OLITKIN JO KIRJAUTUNUT.');
    }
  }

  render() {
    //console.log(this.props.stateToPantry);
    return (
      <React.Fragment>
        <ul>{this.props.stateToPantry.pantry.map(element => (
          <li key={element.id}>{element.title} {element.amount} {element.unit}</li>)
        )}</ul>
      </React.Fragment>
    )
  }
}

Pantry.propTypes = {
  stateToPantry: PropTypes.object,
  history: PropTypes.object
};

export default Pantry
