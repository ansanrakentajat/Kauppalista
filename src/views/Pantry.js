import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PantryItemList from '../components/PantryItemList';
import PantryAddItem from '../components/PantryAddItem';
import PantryFooter from '../components/PantryFooter';

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
    return (
      <React.Fragment>
        <div style={divStyle}>
        <h1>Ruokakomero</h1>
          <PantryAddItem addPantryItem={this.props.addPantryItem} />
          <PantryItemList changePantryTitle={this.props.changePantryTitle} stateToPantry={this.props.stateToPantry} deletePantryItem={this.props.deletePantryItem} />
        </div>
        <PantryFooter />
      </React.Fragment>
    )
  }
}

const divStyle = {
  
  height: '80vh',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column'
};


Pantry.propTypes = {
  stateToPantry: PropTypes.object,
  history: PropTypes.object,
  deletePantryItem: PropTypes.func
};

export default Pantry
