import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import ShoppingList from './components/ShoppingList';
import uuid from 'uuid';
import About from './views/About';
import TestNav from './components/TestNav';
import FrontPage from './views/FrontPage';
import Pantry from './components/Pantry';


class App extends Component {
  state = {
    pantry: [],
    shoppingList: {
      items: [
        {
          id: uuid.v4(),
          title: 'Maito',
          amount: '1',
          unit: 'kpl',
          collected: false
        },
        {
          id: uuid.v4(),
          title: 'Kananmuna',
          amount: '12',
          unit: 'kpl',
          collected: false
        },
        {
          id: uuid.v4(),
          title: 'Leipä',
          amount: '1',
          unit: 'pss',
          collected: false
        }
      ]
    }
  }

  markComplete = (id) => {
    this.setState({
      shoppingList: {
        items: this.state.shoppingList.items.map(item => {
          if (item.id === id) {
            item.collected = !item.collected;
          }
          return item;
        })
      }
    });

  }

  deleteItem = (id) => {
    this.setState({ shoppingList: { items: [...this.state.shoppingList.items.filter(item => item.id !== id)] } });
  }

  addItem = (title, amount, unit) => {
    const newItem = {
      id: uuid.v4(),
      title: title,
      amount: amount,
      unit: unit,
      collected: false
    };
    this.setState({ shoppingList: { items: [...this.state.shoppingList.items, newItem] } }, () => {
      console.log('Here is the whole state after adding shopping list item', this.state);
      localStorage.setItem('munOstoslista', JSON.stringify(this.state));
    });

  }

  addToPantry = () => {

    this.setState({pantry: [...this.state.shoppingList.items]});

    this.setState({shoppingList: {items: []}});
  }


  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <TestNav />
            <Route exact path="/" component={FrontPage} />
            <Route exact path="/ruokakomero" render={props => (
              <React.Fragment>
                <Pantry {...props} stateToPantry={this.state} />
              </React.Fragment>
            )}>
            </Route>
            <Route exact path="/kauppalista" render={props => (
              <React.Fragment>
                <ShoppingList {...props} addToPantry={this.addToPantry} wholeState={this.state} stateItemsForShoppingList={this.state.shoppingList.items} markComplete={this.markComplete} deleteItem={this.deleteItem} addItem={this.addItem} />
              </React.Fragment>
            )}>
            </Route>
            <Route path="/about" component={About}></Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
