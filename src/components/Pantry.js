import React, { Component } from 'react'

class Pantry extends Component {
  render() {
      console.log(this.props.stateToPantry);
      
    return (
      <React.Fragment>
          <h1>moi from Pantry</h1>
          <ul>{this.props.stateToPantry.items.map(element => (
           <li key={element.id}>{element.title} {element.amount} {element.unit}</li>)
          )}</ul>
      </React.Fragment>
    )
  }
}

export default Pantry
