import React, { Component } from 'react'
import Item from './Item';
import PropTypes from 'prop-types';

class ItemList extends Component {

  sendToDescription = (evt) => {
    const testi =  JSON.stringify(this.props.stateItemsForItemList);

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
          <button onClick={this.sendToDescription}>Send to description</button>
          <button onClick={this.fetchFromDescription}>Fetch from description</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {this.props.stateItemsForItemList.map(item => (
            <Item key={item.id} itemForItem={item} markComplete={this.props.markComplete} deleteItem={this.props.deleteItem} />
          ))}
        </div>
      </React.Fragment>



    )



  }
}

ItemList.propTypes = {
  stateItemsForItemList: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired
}

export default ItemList
