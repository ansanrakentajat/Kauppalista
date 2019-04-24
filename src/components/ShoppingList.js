import React, { Component } from 'react'
import AddItem from './AddItem';
import ItemList from './ItemList';
import PropTypes from 'prop-types';
import ShoppingListFooter from './ShoppingListFooter';

class ShoppingList extends Component {



    componentDidMount() {

        if (this.props.stateForLoggedIn.user === null) {
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
                    <AddItem addItem={this.props.addItem} testi={this.props.stateItemsForShoppingList} />
                    <ItemList stateItemsForItemList={this.props.stateItemsForShoppingList} markComplete={this.props.markComplete} deleteItem={this.props.deleteItem} />
                    <ShoppingListFooter sendToDescription={this.props.sendToDescription} fetchFromDescription={this.props.fetchFromDescription} addToPantry={this.props.addToPantry} />
                </div>
            </React.Fragment>
        )
    }
}

const divStyle = {
    height: '90vh',
    position: 'relative',
/*    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'space-evenly'*/
};

ShoppingList.propTypes = {
    stateItemsForShoppingList: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    addToPantry: PropTypes.func.isRequired,
    sendToDescription: PropTypes.func.isRequired,
    fetchFromDescription: PropTypes.func.isRequired,
    stateForLoggedIn: PropTypes.object.isRequired,
}

export default ShoppingList
