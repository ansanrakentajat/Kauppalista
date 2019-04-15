import React, { Component } from 'react';
import './App.css';
import ShoppingList from './components/ShoppingList';


class App extends Component {
  state = {
    items: [
      {
        id: 1,
        title: 'Maito',
        amount: '1 kpl',
        collected: false
      },
      {
        id: 2,
        title: 'Kananmuna',
        amount: '12 kpl',
        collected: false
      },
      {
        id: 3,
        title: 'Leipä',
        amount: '1 pss',
        collected: false
      }
    ]
  }

  markComplete = (id) => {
    this.setState({ todo: this.state.items.map(item => {
      if (item.id === id) {
        item.collected = !item.collected;
      }
      return item;
    }) });

  }


  render() {
    return (
      <div className="App">
        <h1>App</h1>
        <ShoppingList stateItemsForShoppingList={this.state.items} markComplete={this.markComplete} />
      </div>
    );
  }
}

export default App;
