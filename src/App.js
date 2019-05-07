import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import ShoppingList from './components/ShoppingList';
import uuid from 'uuid';
import NavigationBar from './components/NavigationBar';
import Pantry from './views/Pantry';
import Login from './views/Login';
import Recipes from './views/Recipes';
import OneRecipe from './views/OneRecipe';
import { getAllMedia, getFilesByTag } from './util/MediaAPI';
import Settings from './views/Settings';

//anna sanoo moi

class App extends Component {
  state = {
    user: null,
    recipeArray: [],
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

  updateRecipes = () => {
    getAllMedia('kpList4jaks4AnsanRakentaja').then((foods) => {
      console.log(foods);
      this.setState({recipeArray: foods});
    });
  };

  componentDidMount() {
    this.updateRecipes();
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
      }, () => {
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

  // OMIA METODEJA ---------------------------------------------------------------------------------------------- 

  // Tällä metodilla luodaan muotoiltu kutsumishetken päivämäärä. 
  thisDate = () => {
    const todayDate = new Date();
    const day = todayDate.getDate();
    let month = todayDate.getMonth();
    month++;
    const year = todayDate.getFullYear();
    return `${day}.${month}.${year}`;
  }

  // Tällä metodilla muutetaan statessa ShoppingList itemin collected-arvo päinvastaiseksi.
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
    }, () => { this.sendToDescription() });
  }

  // Tällä metodilla poistetaan tietty ShoppingList:n item statesta.
  deleteItem = (id) => {
    this.setState({ shoppingList: { items: [...this.state.shoppingList.items.filter(item => item.id !== id)] } }, () => {
      this.sendToDescription();
    });
  }

  // Tällä metodilla lisätään stateen ShoppingList:n itemi.
  addItem = (title, amount, unit) => {
    const newItem = {
      id: uuid.v4(),
      title: title,
      amount: amount,
      unit: unit,
      collected: false
    };
    this.setState({ shoppingList: { items: [...this.state.shoppingList.items, newItem] } }, () => {
      //console.log('Here is the whole state after adding shopping list item', this.state);
      localStorage.setItem('munOstoslista', JSON.stringify(this.state));
      this.sendToDescription();
    });

  }

  // Tällä metodilla lisäätään ostoslistan rivit ruokakomeroon ja tyhjennetään ostoslista.
  addToPantry = () => {
    const collectedItems = [...this.state.shoppingList.items.filter(item => item.collected === true)];
    //console.log(collectedItems, 'collected items');

    // luodaan uusi Set-objekti, joka sisältää kaikki uniikit ostoslistan titlet
    const setOfUniqueTitles = new Set(collectedItems.map(item => item.title));
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
      // Käytetään ylempänä määriteltyä metodia 'thisDate'.
      const dateAdded = this.thisDate();
      tuote = { ...tuote, dateAdded };
      // alempi rivi poistaa objekteista collected-propertyn
      //delete tuote.collected;
      //console.log('tuote on: ', tuote);
      this.setState(prevState => { return { pantry: [...prevState.pantry, tuote] } });
    });
    // tyhjennetään staten shopping listin items-array
    this.setState({ shoppingList: { items: [...this.state.shoppingList.items.filter(item => item.collected === false)] } }, () => {this.sendToDescription()});
  }

  // Tällä metodilla lähetetään käyttäjän state backendiin käyttäjän profiilikuvan description-kenttään.
  sendToDescription = (evt) => {
    const stateToDesc = { ...this.state };
    delete stateToDesc.user;
    delete stateToDesc.recipeArray;
    //console.log('Tämä on backendiin lähetettävä käyttäjän state', stateToDesc);
    const stateToDescString = JSON.stringify(stateToDesc);
    //console.log('Tämä on backendiin lähetettävä käyttäjän state muutettuna merkkijonoksi', stateToDescString);
    const token2 = localStorage.getItem('token2');
    const data = {
      description: `${stateToDescString}`,
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
      //console.log(json);
    }).catch(err => console.log('Tämä error tuli sendToDescription:n aikana:', err));
  }

  // Tällä metodilla haetaan backendistä käyttäjän profiilikuvan description-kentästä tallennettu state ja se asetetaan staten arvoksi.
  fetchFromDescription = (evt) => {
    fetch('http://media.mw.metropolia.fi/wbma/media/' + this.state.user.profilePic.file_id).then(res => {
      return res.json();
    }).then(json => {
      // String-muotoinen state parsetetaan JS-objektiksi
      //console.log(JSON.parse(json.description));
    }).catch(err => console.log('Tämä error tuli fetchFromDescription:n aikana:', err));
  }

  // ??? 2.5.19 KLO 9:55 ONKOHAN TÄMÄ METODI TURHA ???
  isUserLoggedIn = () => {
    if (this.state.user === undefined) {
      console.log('Statessa ei ole käyttäjää. Ohjataan kirjautumissivulle...');
      this.props.history.push('/');
    } else {
      console.log('Statessa on käyttäjä.');
    }
  }

  // Tällä metodilla poistetaan Pantry:n itemi statesta.
  deletePantryItem = (id) => {
    this.setState({ pantry: [...this.state.pantry.filter(item => item.id !== id)] }, () => {this.sendToDescription()});
  }

  // Tällä metodilla päivitetään muutettu Pantry:n itemin title stateen.
  changePantryTitle = (newTitle, id) => {
    this.setState({
      pantry: this.state.pantry.map(item => {
        if (item.id === id) {
          item.title = newTitle;
        }
        return item;
      })
    }, () => {this.sendToDescription()});
  }

  // Tällä metodilla lisätään Pantryn uusi itemi stateen.
  addPantryItem = (title, amount, unit) => {
    // Käytetään ylempänä määriteltyä metodia 'thisDate'.
    const dateAdded = this.thisDate();

    const newItem = {
      id: uuid.v4(),
      title: title,
      amount: amount,
      unit: unit,
      dateAdded: dateAdded
    };
    this.setState({ pantry: [...this.state.pantry, newItem] }, () => {
      //console.log('Here is the whole state after adding pantry item', this.state);
      localStorage.setItem('munOstoslista', JSON.stringify(this.state));
      this.sendToDescription();
    });
  }


  //---------------------------------------------------------------------------------------------------------------



  render() {
    return (
      <Router>
        <div className="App">
          <NavigationBar />
          <Route exact path="/" render={(props) => (
            <Login {...props} state={this.state} fetchFromDescription={this.fetchFromDescription} setUser={this.setUser} />
          )} />
          <Route path="/ruokakomero" render={props => (
            <React.Fragment>
              <Pantry {...props} addPantryItem={this.addPantryItem} changePantryTitle={this.changePantryTitle} stateToPantry={this.state} deletePantryItem={this.deletePantryItem} />
            </React.Fragment>
          )}>
          </Route>
          <Route path="/ostoslista" render={props => (
            <React.Fragment>
              <ShoppingList {...props} stateForLoggedIn={this.state} sendToDescription={this.sendToDescription} fetchFromDescription={this.fetchFromDescription} addToPantry={this.addToPantry} stateItemsForShoppingList={this.state.shoppingList.items} markComplete={this.markComplete} deleteItem={this.deleteItem} addItem={this.addItem} />
            </React.Fragment>
          )}>
          </Route>
          <Route exact path="/reseptit" render={props => (
                <React.Fragment>
                  <Recipes {...props} picArray={this.state.recipeArray} />
                </React.Fragment>
            )}>
            </Route>
            <Route exact path="/resepti/:id" component={OneRecipe}>
            </Route>
          <Route path="/asetukset" render={props => (
            <React.Fragment>
              <Settings {...props} sendToDescription={this.sendToDescription} stateForLoggedIn={this.state} setUserLogout={this.setUserLogout} />
            </React.Fragment>
          )}>
          </Route>
        </div>
      </Router>
    );
  }
}



export default App;
