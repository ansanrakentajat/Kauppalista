import React from 'react';
import PropTypes from 'prop-types';
import {GridList} from "@material-ui/core";

const Ingredients = (props) => {
   /* let ingredients = {
        ingredients: [
            {
                title: "",
                amount: "",
                unit: "",
                available: ""
            }
        ]
    };
    try {
        ingredients = JSON.parse(description);
    } catch (e) {
        console.log(e)
    }
*/


    let rows ={
        ingredients: '',
        desc: '',
        time: '',
        portions: ''
    };

    const printThis =()=>{
        try{
        rows= props;
        console.log('tässä on ingredientsin propsit' + rows);
        props.description.map(tile =>(
            <p>{tile.ingredients[0].title}</p>
        ))
    } catch (e) {
        console.log(e)
    }};
    /*rows = props.description.map(tile =>

        (ingredients, desc, time, portions) => {
        return rows;
    });*/
    return (
        <React.Fragment>
            {console.log('TÄSSÄ PROPSIT' + JSON.stringify(props))}
            <GridList>
                {printThis}
            </GridList>
        </React.Fragment>
);
};

/*{props.picArray.map(tile => (
                    <GridListTile key={tile.file_id} component={Link} to={'resepti/' + tile.file_id}>
                        {tile.media_type === 'image' &&
                        <img src={mediaUrl + 'uploads/' + tile.thumbnails.w160} alt={tile.title}/>
                        }
                        <GridListTileBar
                            title={tile.title}
                        />
                    </GridListTile>
                ))}*/


Ingredients.propTypes = {
    description: PropTypes.array,
};

export default Ingredients;