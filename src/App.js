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

  render() {
    return (
      <div className="App">
        <h1>App</h1>
        <ShoppingList stateItemsForShoppingList={this.state.items}/>
      </div>
    );
  }
}

export default App;
