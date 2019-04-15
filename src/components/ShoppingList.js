import React, { Component } from 'react'
import AddItem from './AddItem';
import ItemList from './ItemList';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
    render() {
        return (
            <React.Fragment>
                <p>this is a shopping list</p>
                <AddItem/>
                <ItemList stateItemsForItemList={this.props.stateItemsForShoppingList} markComplete={this.props.markComplete} deleteItem={this.props.deleteItem} />
            </React.Fragment>
        )
    }
}

ShoppingList.propTypes = {
    stateItemsForShoppingList: PropTypes.array.isRequired
}

export default ShoppingList
