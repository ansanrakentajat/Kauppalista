import React, { Component } from 'react'
import AddItem from './AddItem';
import ItemList from './ItemList';
import PropTypes from 'prop-types';
import ShoppingListFooter from './ShoppingListFooter';

class ShoppingList extends Component {
    render() {
        return (
            <React.Fragment>
                <div style={{width: '90%'}}>
                <p style={{paddingTop: '10vh',}}>this is a shopping list</p>
                <AddItem addItem={this.props.addItem} testi={this.props.stateItemsForShoppingList}/>
                <ItemList stateItemsForItemList={this.props.stateItemsForShoppingList} markComplete={this.props.markComplete} deleteItem={this.props.deleteItem} />
                <ShoppingListFooter addToPantry={this.props.addToPantry}/>
                </div>
            </React.Fragment>
        )
    }
}

ShoppingList.propTypes = {
    stateItemsForShoppingList: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    addToPantry: PropTypes.func.isRequired
}

export default ShoppingList
