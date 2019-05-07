import React, { /*Component*/ } from 'react';
import PropTypes from 'prop-types';
//import { getFilesByTag*/ } from "../util/MediaAPI";
import RecipeGrid from "../components/RecipeGrid";

//Täällä on kaikki reseptit listattuna

const Recipes = (props) => {

    const {picArray} = props;

    return (
        <React.Fragment>
            <h1>Reseptit</h1>
            <RecipeGrid picArray={picArray} edit={false}/>
        </React.Fragment>
    )

        //console.log(this.props.stateToPantry);

}

Recipes.propTypes = {
    stateToPantry: PropTypes.object,
    history: PropTypes.object,
    picArray: PropTypes.array
};

export default Recipes
