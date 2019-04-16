import React, { Component } from 'react'
import Item from './Item';
import PropTypes from 'prop-types';

class ItemList extends Component {

  sendToDescription = (evt) => {
    const testi =  JSON.stringify(this.props.wholeState);

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
      <React.Fragment>
        <div>
          <button onClick={this.sendToDescription}>sendToDescription</button>
          <button onClick={this.fetchFromDescription}>Fetch from description</button>
          <button onClick={this.props.addToPantry}>Add To Pantry</button>
        </div>
        
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
         
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>OSTOSLISTA</h3>
            {this.props.stateItemsForItemList.map(item => {
              let moi;
              if (!item.collected) {
                moi = <Item key={item.id} itemForItem={item} markComplete={this.props.markComplete} deleteItem={this.props.deleteItem}/>
              }
              return moi;
            }
            )}
      </div>

          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>KERÄTYT</h3>
            {this.props.stateItemsForItemList.map(item => {
              let tere;
              if (item.collected) {
                tere = <Item key={item.id} itemForItem={item} markComplete={this.props.markComplete} deleteItem={this.props.deleteItem}/>
              }
              return tere;
            }
            )}
          </div>
                                                  
        </div>
      </React.Fragment>
    )

  }
}

ItemList.propTypes = {
  stateItemsForItemList: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  wholeState: PropTypes.object.isRequired,
  addToPantry: PropTypes.func.isRequired
}

export default ItemList
