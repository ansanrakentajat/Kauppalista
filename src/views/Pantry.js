import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PantryItemList from '../components/PantryItemList';
import PantryAddItem from '../components/PantryAddItem';

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
        <PantryAddItem addPantryItem={this.props.addPantryItem} />
        <PantryItemList changePantryTitle={this.props.changePantryTitle} stateToPantry={this.props.stateToPantry} deletePantryItem={this.props.deletePantryItem} />
      </React.Fragment>
    )
  }
}

Pantry.propTypes = {
  stateToPantry: PropTypes.object,
  history: PropTypes.object,
  deletePantryItem: PropTypes.func
};

export default Pantry
