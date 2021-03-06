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
import Profilepic from './views/Profilepic';
import { getAllMedia, getFilesByTag } from './util/MediaAPI';
import Settings from './views/Settings';


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
      this.setState({ recipeArray: foods });
    });
  };

  componentDidMount() {
    this.updateRecipes();
  }

  setUser = (user) => {
    this.setState({ user });
    console.log('setuser state', this.state);
    // hae profiilikuva ja liitä se user-objektiin
    const myPromise = new Promise((resolve, reject) => {
      getFilesByTag('profile').then((files) => {
        const profilePic = files.filter((file) => {
          let outputFile = null;
          if (file.user_id === this.state.user.user_id) {
            outputFile = file;
          }
          //console.log('output file', outputFile);
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
          console.log('set staten logi', this.state.user.profilePic);
          if (this.state.user.profilePic === undefined) {
            resolve('resolved');
            console.log('toimii ' + resolve);
          } else {
            resolve('testi');
            this.setState(JSON.parse(this.state.user.profilePic.description));
            resolve('testi');
          }
        });
      });
    }).catch(e => {
      console.log(e, 'erroria');
    });
    return myPromise;
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
    this.setState({ shoppingList: { items: [...this.state.shoppingList.items.filter(item => item.collected === false)] } }, () => { this.sendToDescription() });
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
    this.setState({ pantry: [...this.state.pantry.filter(item => item.id !== id)] }, () => { this.sendToDescription() });
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
    }, () => { this.sendToDescription() });
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


  calcPersentage = () => {

    let arrayOfIngredients = JSON.parse(JSON.stringify(this.state.recipeArray.map(resepti => JSON.parse(resepti.description).ingredients)));
    console.log(arrayOfIngredients, 'arrayOfIngredients');
    // otetaan deep copy statePantry:sta, jottei tämä toiminto mutantoi App:n statea
    const arrayOfPantryItems = JSON.parse(JSON.stringify(this.state.pantry));
    console.log('arrayOfPantryItems :', arrayOfPantryItems);
    const setOfPantryTitles = new Set(arrayOfPantryItems.map(item => item.title));
    console.log('setOfPantryTitles :', setOfPantryTitles);
    // tehdään array, johon laitetaan useampi array. Nämä arrayt sisältävät kaikki samannimiset ruokakomeron rivit
    const arrayByTitle = [];
    // loopataan setOfUniqueTitles läpi ja kullakin kierroksella luodaan array, johon filteröity sen kierroksen samannimiset ruokakomeron rivit
    setOfPantryTitles.forEach((uniqueTitle) => {
      const tempArray = [...arrayOfPantryItems.filter(item => item.title === uniqueTitle)];
      arrayByTitle.push(tempArray);
    });
    console.log('arrayByTitle :', arrayByTitle);
    // luodaan array, johon laitetaan arrayt ruokakomeron samannimisistä ja samanyksikköisistä objekteista.
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
    console.log('sameTitleAndUnitArray :', sameTitleAndUnitArray);
    // luodaan array, johon laitetaan valmiit summatut ruokakomeron objektit. Objektilla on uniikki nimi-yksikköpari ja sen määrä on summa kyseisten tuotteiden määristä.
    const productsForCompareArray = [];
    sameTitleAndUnitArray.forEach(tuote => {
      const tempObject = tuote.reduce((summa, summattava) => {
        // muutetaan ensimmäinen objektin amount numeroksi, koska se on String
        Number(summa.amount);
        // summataan objektien numeroiksi muutetut määrät
        summa.amount = Number(summa.amount) + Number(summattava.amount);
        // palautetaan ensimmäisen objekti, jonka määrä on summa
        return summa;
      });
      productsForCompareArray.push(tempObject);
    });

    console.log('productsForCompareArray :', productsForCompareArray);
    // ------------------------- TÄSSÄ VAIHEESSA RUOKAKOMERON TAVARAT ON SUMMATTU JA VOIDAAN SIIRTYÄ VERTAILUUN----------------------------------------------------
    console.log('arrayOfIngredients :', arrayOfIngredients);

    arrayOfIngredients = arrayOfIngredients.map(resepti => {
      const uusiResepti = resepti.map(ainesosa => {
        productsForCompareArray.map(product => {
          if (ainesosa.title === product.title && ainesosa.unit === product.unit && Number(ainesosa.amount) <= Number(product.amount)) {
            ainesosa.available = true;
          }
          return 'tällä ei ole mitään väliä';
        })
        return ainesosa;
      });
      return uusiResepti;
    });
    //console.log('arrayOfIngredients :', arrayOfIngredients);
    const testi = arrayOfIngredients.map(resepti => {
      return resepti.map(ainesosa => {
        return ainesosa.available === true ? 1 : 0
      });
    });
    //console.log('testi :', testi);
    const testi2 = testi.map(oneZeroArray => {
      let howManyOnes = 0;
      oneZeroArray.map(element => {
        if (element === 1) {
          howManyOnes++
        }
        return element
      });
      console.log('howManyOnes :', howManyOnes);
      return howManyOnes / oneZeroArray.length;
    });
    //console.log('testi2 :', testi2);
    const testi3 = testi2.map(value => { return ((value * 100).toFixed(2)) + ' %' });
    console.log('testi3 :', testi3);

    return [arrayOfIngredients, testi3]

  }

  //---------------------------------------------------------------------------------------------------------------



  render() {

    return (
      <Router basename='/~villeatu/periodi4/kauppalista'>
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
              <Recipes {...props} calcPersentage={this.calcPersentage} picArray={this.state.recipeArray} statePantry={this.state.pantry} stateForLoggedIn={this.state} />
            </React.Fragment>
          )}>
          </Route>

          <Route exact path="/reseptit/:id" render={props => (
            <React.Fragment>
              <OneRecipe {...props} calcPersentage={this.calcPersentage} />
            </React.Fragment>
          )}>
          </Route>

          <Route exact path="/resepti/:id" component={OneRecipe}>
          </Route>
          <Route path="/asetukset" render={props => (
            <React.Fragment>
              <Settings {...props}
                sendToDescription={this.sendToDescription}
                stateForLoggedIn={this.state}
                setUserLogout={this.setUserLogout} />
            </React.Fragment>
          )}>
          </Route>
          <Route exact path="/profiilikuva" render={props => (
            <Profilepic {...props}
              sendToDescription={this.sendToDescription}
              stateForLoggedIn={this.state}
              setUser={this.setUser} />
          )} />
        </div>
      </Router>
    );
  }
}



export default App;
