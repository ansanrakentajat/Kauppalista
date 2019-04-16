import React, { Component } from 'react'
import AddItem from './AddItem';
import ItemList from './ItemList';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
    render() {
        return (
            <React.Fragment>
                <p>this is a shopping list</p>
                <AddItem addItem={this.props.addItem} testi={this.props.stateItemsForShoppingList}/>
                <ItemList addToPantry={this.props.addToPantry} wholeState={this.props.wholeState} stateItemsForItemList={this.props.stateItemsForShoppingList} markComplete={this.props.markComplete} deleteItem={this.props.deleteItem} />
            </React.Fragment>
        )
    }
}

ShoppingList.propTypes = {
    stateItemsForShoppingList: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    wholeState: PropTypes.object.isRequired,
    addToPantry: PropTypes.func.isRequired
}

export default ShoppingList
