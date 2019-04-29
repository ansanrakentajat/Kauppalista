import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Tässä näkyy yksittäinen resepti

class OneRecipe extends Component {

    componentDidMount() {
        console.log('RESEPTI TOIMII');
    }

    render() {
        //console.log(this.props.stateToPantry);
        return (
            <React.Fragment>
                <h1>TERVETULOA RESEPTIIN</h1>
            </React.Fragment>
        )
    }
}

OneRecipe.propTypes = {
    stateToPantry: PropTypes.object,
    history: PropTypes.object
};

export default OneRecipe
