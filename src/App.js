import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import ShoppingList from './components/ShoppingList';
import uuid from 'uuid';
import About from './views/About';
import TestNav from './components/TestNav';


class App extends Component {
  state = {
    items: [
      {
        id: uuid.v4(),
        title: 'Maito',
        amount: '1 kpl',
        collected: false
      },
      {
        id: uuid.v4(),
        title: 'Kananmuna',
        amount: '12 kpl',
        collected: false
      },
      {
        id: uuid.v4(),
        title: 'Leipä',
        amount: '1 pss',
        collected: false
      }
    ]
  }

  markComplete = (id) => {
    this.setState({
      todo: this.state.items.map(item => {
        if (item.id === id) {
          item.collected = !item.collected;
        }
        return item;
      })
    });

  }

  deleteItem = (id) => {
    this.setState({ items: [...this.state.items.filter(item => item.id !== id)] });
  }

  addItem = (title) => {
    const newItem = {
      id: uuid.v4(),
      title: title,
      completed: false
    };
    this.setState({ items: [...this.state.items, newItem] })
  }


  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <TestNav />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <ShoppingList {...props} stateItemsForShoppingList={this.state.items} markComplete={this.markComplete} deleteItem={this.deleteItem} addItem={this.addItem} />
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
