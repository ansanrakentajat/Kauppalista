import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Täällä on kaikki reseptit listattuna

class Recipes extends Component {

    componentDidMount() {
        console.log('RESEPTIT TOIMII');
    }

    render() {
        //console.log(this.props.stateToPantry);
        return (
            <React.Fragment>
                <h1>TERVETULOA RESEPTEIHIN</h1>
            </React.Fragment>
        )
    }
}

Recipes.propTypes = {
    stateToPantry: PropTypes.object,
    history: PropTypes.object
};

export default Recipes
