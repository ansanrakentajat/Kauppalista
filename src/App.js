import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import ShoppingList from './components/ShoppingList';
import uuid from 'uuid';
import About from './views/About';
import TestNav from './components/TestNav';
import FrontPage from './views/FrontPage';
import Pantry from './views/Pantry';
import Login from './views/Login';
import { getFilesByTag } from './util/MediaAPI';
import Settings from './views/Settings';


class App extends Component {
  state = {
    user: null,
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


  setUser = (user) => {
    this.setState({ user });
    // hae profiilikuva ja liitä se user-objektiin
    getFilesByTag('profile').then((files) => {
      const profilePic = files.filter((file) => {
        let outputFile = null;
        if (file.user_id === this.state.user.user_id) {
          outputFile = file;
        }
        return outputFile;
      });
      
      this.setState((prevState) => {
        return {
          user: {
            ...prevState.user,
            profilePic: profilePic[0],
          },
        };
      },() => {
        console.log(JSON.parse(this.state.user.profilePic.description), 'moi');
        this.setState(JSON.parse(this.state.user.profilePic.description));
      });
    });
  };

  setUserLogout = (user) => {
    this.setState({ user });
  };

  checkLogin = () => {
    return this.state.user !== null;
  };

  // OMIA METODEJA  

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

  // tämä metodi lisää ostoslistan rivit ruokakomeroon ja tyhjentää ostoslistan
  addToPantry = () => {
    // luodaan uusi Set-objekti, joka sisältää kaikki uniikit ostoslistan titlet
    const setOfUniqueTitles = new Set(this.state.shoppingList.items.map(item => item.title));
    // tehdään array, johon laitetaan useampi array. Nämä arrayt sisältävät kaikki samannimiset ostoslistan rivit
    const arrayByTitle = [];
    // loopataan setOfUniqueTitles läpi ja kullakin kierroksella luodaan array, johon filteröity sen kierroksen samannimiset ostoslistan rivit
    setOfUniqueTitles.forEach((uniqueTitle) => {
      const tempArray = [...this.state.shoppingList.items.filter(item => item.title === uniqueTitle)];
      arrayByTitle.push(tempArray);
    });
    // luodaan array, johon laitetaan arrayt samannimisistä ja samanyksikköisistä objekteista.
    const sameTitleAndUnitArray = [];
    // loopataan arrayByTitle läpi ja joka kierroksella luodaan uusi Set-objekti sen uniikeista yksiköistä
    arrayByTitle.forEach((tuote) => {
      const uniqueUnitSet = new Set(tuote.map(item => item.unit));
      // loopataan tietyn tuotteen uniikit yksiköt ja filteröidään sieltä tuotteet arrayna, jolla on sama yksikkö kuin kierroksella. 
      uniqueUnitSet.forEach(uniqueUnit => {
        const sameUnit = tuote.filter(item => item.unit === uniqueUnit);
        sameTitleAndUnitArray.push(sameUnit);
      });
    });
    // luodaan array, johon laitetaan valmiit ruokakomeroon siirrettävät objektit. Objektilla on uniikki nimi-yksikköpari ja sen määrä on summa kyseisten tuotteiden määristä.
    const productsToPantryArray = [];
    sameTitleAndUnitArray.forEach(tuote => {
      const tempObject = tuote.reduce((summa, summattava) => {
        // muutetaan ensimmäinen objektin amount numeroksi, koska se on String
        Number(summa.amount);
        // summataan objektien numeroiksi muutetut määrät
        summa.amount = Number(summa.amount) + Number(summattava.amount);
        // palautetaan ensimmäisen objekti, jonka määrä on summa
        return summa;
      });
      productsToPantryArray.push(tempObject);
    });
    // loopataan productsToPantryArray läpi ja päivitetään kullakin kierroksella stateen uusi tuote.
    productsToPantryArray.forEach(tuote => {
      //%%%%%%%%%%%%%%%%%%%%%%% EHKÄ TÄHÄN VÄLIIN PVM %%%%%%%%%%%%%%%%%%%%%%%
      const date = new Date();
      const day = date.getDate();
      let month = date.getMonth();
      month++;
      const year = date.getFullYear();
      const dateAdded = `${day}.${month}.${year}`;
      tuote = { ...tuote, dateAdded };
      // alempi rivi poistaa objekteista collected-propertyn
      //delete tuote.collected;
      console.log('tuote on: ', tuote);
      //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      this.setState(prevState => { return { pantry: [...prevState.pantry, tuote] } });
    });
    // tyhjennetään staten shopping listin items-array
    this.setState({ shoppingList: { items: [] } });
  }

  sendToDescription = (evt) => {
    const stateToDesc = { ...this.state };
    delete stateToDesc.user;
    console.log('stateToDesc:', stateToDesc);
    const testi = JSON.stringify(stateToDesc);
    console.log('testi(STRING-muotoinen lähetettävä state):', testi);
    const token2 = localStorage.getItem('token2');
    const data = {
      description: `${testi}`,
    };
    const settings = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token2
      },
      body: JSON.stringify(data),
    };
    fetch('http://media.mw.metropolia.fi/wbma/media/' + this.state.user.profilePic.file_id, settings).then(res => {
      return res.json();
    }).then(json => {
      console.log(json);
    }).catch(err => console.log('tämä error tuli:', err));
  }

  fetchFromDescription = (evt) => {
    console.log('this.state.user.profilePic.file_id', this.state.user.profilePic.file_id);
    fetch('http://media.mw.metropolia.fi/wbma/media/' + this.state.user.profilePic.file_id).then(res => {
      return res.json();
    }).then(json => {
      console.log(JSON.parse(json.description));
    }).catch(err => console.log('tämä error tuli:', err));
  }

  villenTesti = () => {
    if (this.state.user === undefined) {
      console.log('ei ole käyttäjää. SOO SOO!');
      this.props.history.push('/');
    } else {
      console.log('on käyttäjä. JEE!');
    }
  }


  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <TestNav />

            <Route exact path="/" render={(props) => (
              <Login {...props} state={this.state} fetchFromDescription={this.fetchFromDescription} setUser={this.setUser} />
            )} />
            <Route exact path="/ruokakomero" render={props => (
              <React.Fragment>
                <Pantry {...props} stateToPantry={this.state} />
              </React.Fragment>
            )}>
            </Route>
            <Route exact path="/ostoslista" render={props => (
              <React.Fragment>
                <ShoppingList {...props} stateForLoggedIn={this.state} sendToDescription={this.sendToDescription} fetchFromDescription={this.fetchFromDescription} addToPantry={this.addToPantry} stateItemsForShoppingList={this.state.shoppingList.items} markComplete={this.markComplete} deleteItem={this.deleteItem} addItem={this.addItem} />
              </React.Fragment>
            )}>
            </Route>
            <Route path="/asetukset" render={props => (
              <React.Fragment>
                <Settings {...props} sendToDescription={this.sendToDescription} stateForLoggedIn={this.state} setUserLogout={this.setUserLogout} />
              </React.Fragment>
            )}>
            </Route>
            <Route path="/about" component={About}></Route>
            <Route path="/etusivu" component={FrontPage} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
