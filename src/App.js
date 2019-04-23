import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import ShoppingList from './components/ShoppingList';
import uuid from 'uuid';
import About from './views/About';
import TestNav from './components/TestNav';
import FrontPage from './views/FrontPage';
import Pantry from './components/Pantry';
import Login from './views/Login';


class App extends Component {
  state = {
    pantry: [
      {
        id: uuid.v4(),
        title: 'Maito',
        amount: '1.5',
        unit: 'l',
        collected: false
      }
    ],
    shoppingList: {
      items: [
        {
          id: uuid.v4(),
          title: 'Maito',
          amount: '1',
          unit: 'l',
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
    console.log('amount :', amount);
    console.log('typeof(amount) :', typeof (amount));
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

  // tämä metodi lisää ostoslistan rivit ruokakomeroon ja tyhjentää ostoslistan
  addToPantry = () => {
    // '%%%...' tarkoittaa kokeellista osuutta
    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // luodaan uusi Set-objekti, joka sisältää kaikki uniikit ostoslistan titlet
    const setOfUniqueTitles = new Set(this.state.shoppingList.items.map(item => item.title));

    //console.log(setOfUniqueTitles);

    // tehdään array, johon laitetaan useampi array. Nämä arrayt sisältävät kaikki samannimiset ostoslistan rivit
    const arrayByTitle = [];
    // loopataan setOfUniqueTitles läpi ja kullakin kierroksella luodaan array, johon filteröity sen kierroksen samannimiset ostoslistan rivit
    setOfUniqueTitles.forEach((uniqueTitle) => {
      const tempArray = [...this.state.shoppingList.items.filter(item => item.title === uniqueTitle)];
      arrayByTitle.push(tempArray);
    });

    //console.log('arrayByTitle', arrayByTitle);
    //console.log('toimii...');

    // luodaan array, johon laitetaan arrayt samannimisistä ja samanyksikköisistä objekteista.
    const sameTitleAndUnitArray = [];
    // loopataan arrayByTitle läpi ja joka kierroksella luodaan uusi Set-objekti sen uniikeista yksiköistä
    arrayByTitle.forEach((tuote) => {
      const uniqueUnitSet = new Set(tuote.map(item => item.unit));
      // loopataan tietyn tuotteen uniikit yksiköt ja filteröidään sieltä tuotteet arrayna, jolla on sama yksikkö kuin kierroksella. 
      uniqueUnitSet.forEach(uniqueUnit => {
        const sameUnit = tuote.filter(item => item.unit === uniqueUnit);

        //console.log('sameUnit :', sameUnit);

        sameTitleAndUnitArray.push(sameUnit);
      });
    });

    //console.log('sameTitleAndUnitArray :', sameTitleAndUnitArray);
    //console.log('toimii...');

    // luodaan array, johon laitetaan valmiit ruokakomeroon siirrettävät objektit. Objektilla on uniikki nimi-yksikköpari ja sen määrä on summa kyseisten tuotteiden määristä.
    const productsToPantryArray = [];
    sameTitleAndUnitArray.forEach(tuote => {
      const tempObject = tuote.reduce((summa, summattava) => {

        //console.log('summa :', summa.amount);
        //console.log('summattava :', summattava.amount);

        // muutetaan ensimmäinen objektin amount numeroksi, koska se on String
        Number(summa.amount);
        // summataan objektien numeroiksi muutetut määrät
        summa.amount = Number(summa.amount) + Number(summattava.amount);
        // palautetaan ensimmäisen objekti, jonka määrä on summa
        return summa;
      });

      //console.log('tempObject :', tempObject);

      productsToPantryArray.push(tempObject);
    });

    //console.log('productsToPantryArray :', productsToPantryArray);

    // loopataan productsToPantryArray läpi ja päivitetään kullakin kierroksella stateen uusi tuote.
    productsToPantryArray.forEach(tuote => {
      this.setState(prevState => { return { pantry: [...prevState.pantry, tuote] } });

      //console.log('tuote :', tuote);

    });


    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    //-----------ALLA OLEVA TOIMII-------------------------------

    //this.setState({pantry: [...this.state.pantry, pantryynArray]});

    // tyhjennetään staten shopping listin items-array
    this.setState({ shoppingList: { items: [] } });
  }

  sendToDescription = (evt) => {
    const testi = JSON.stringify(this.state);
    // some data
    const data = {
      description: `${testi}`,
    };
    // settings object for fetch 
    const settings = {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5NjcsInVzZXJuYW1lIjoidmlsbGV0dW9taSIsImVtYWlsIjoidmlsbGUudHVvbWkyQG1ldHJvcG9saWEuZmkiLCJmdWxsX25hbWUiOm51bGwsImlzX2FkbWluIjpudWxsLCJ0aW1lX2NyZWF0ZWQiOiIyMDE5LTAzLTE5VDExOjMyOjU5LjAwMFoiLCJpYXQiOjE1NTQ4ODE0OTMsImV4cCI6MTU1Njk1NTA5M30.WySAqi9dfxueqxgk5YfoU-EkLSXRe1bVkiqcZul8XDY"
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header  
    };
    fetch('http://media.mw.metropolia.fi/wbma/media/1696', settings).then(res => {
      return res.json();
    }).then(json => {
      console.log(json);
    }).catch(err => console.log('tämä error tuli:', err));
  }

  fetchFromDescription = (evt) => {
    fetch('http://media.mw.metropolia.fi/wbma/media/1696').then(res => {
      return res.json();
    }).then(json => {
      console.log(JSON.parse(json.description));
    }).catch(err => console.log('tämä error tuli:', err));
  }


  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <TestNav sendToDescription={this.sendToDescription} fetchFromDescription={this.fetchFromDescription} />
            <Route exact path="/" component={FrontPage} />
            <Route exact path="/ruokakomero" render={props => (
              <React.Fragment>
                <Pantry {...props} stateToPantry={this.state} />
              </React.Fragment>
            )}>
            </Route>
            <Route exact path="/ostoslista" render={props => (
              <React.Fragment>
                <ShoppingList {...props} addToPantry={this.addToPantry} stateItemsForShoppingList={this.state.shoppingList.items} markComplete={this.markComplete} deleteItem={this.deleteItem} addItem={this.addItem} />
              </React.Fragment>
            )}>
            </Route>
            <Route path="/about" component={About}></Route>
            <Route path="/login" render={(props) => (
              <Login {...props} />
            )} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
