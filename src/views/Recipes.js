import React from 'react';
import PropTypes from 'prop-types';

import RecipeGrid from "../components/RecipeGrid";

//Täällä on kaikki reseptit listattuna

const Recipes = (props) => {

    const { picArray } = props;

    if (props.stateForLoggedIn.user === null) {
        console.log('ET OLE KIRJAUTUNUT! SINUT SIIRRETÄÄN LOGIN-SIVULLE.');
        props.history.push('/');
    } else {
        console.log('AI OLITKIN JO KIRJAUTUNUT.');
    }


    return (
        <React.Fragment>
            <div style={{ backgroundColor: '#ffeaea' }}>
                <h1>Reseptit</h1>
                <RecipeGrid calcPersentage={props.calcPersentage} picArray={picArray} edit={false} statePantry={props.statePantry} />
            </div>
        </React.Fragment>
    )

}

Recipes.propTypes = {
    stateToPantry: PropTypes.object,
    history: PropTypes.object,
    picArray: PropTypes.array
};

export default Recipes
