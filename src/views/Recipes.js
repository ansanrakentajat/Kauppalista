import React from 'react';
import PropTypes from 'prop-types';

import RecipeGrid from "../components/RecipeGrid";

//Täällä on kaikki reseptit listattuna

const Recipes = (props) => {

    const {picArray} = props;

    return (
        <React.Fragment>
            <h1>Reseptit</h1>
            <RecipeGrid calcPersentage={props.calcPersentage} picArray={picArray} edit={false} statePantry={props.statePantry}/>
        </React.Fragment>
    )

}

Recipes.propTypes = {
    stateToPantry: PropTypes.object,
    history: PropTypes.object,
    picArray: PropTypes.array
};

export default Recipes
