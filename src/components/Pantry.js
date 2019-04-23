import React, { Component } from 'react'

class Pantry extends Component {
  render() {
      console.log(this.props.stateToPantry);
      
    return (
      <React.Fragment>
          <h1>Ville sanoo:"Moi from Pantry!"</h1>
          <ul>{this.props.stateToPantry.pantry.map(element => (
           <li key={element.id}>{element.title} {element.amount} {element.unit}</li>)
          )}</ul>
      </React.Fragment>
    )
  }
}

export default Pantry
