import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    GridList,
    GridListTile,
    GridListTileBar,
    ListSubheader,
} from '@material-ui/core';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/';

const RecipeGrid = (props) => {
    return (
        <React.Fragment>
            {console.log('TÄSSÄ PROPSIT' + JSON.stringify(props))}
        <GridList>
            /*Tähäh haku jos ehitään
            <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
                <ListSubheader component="div"></ListSubheader>
            </GridListTile>*/
            {props.picArray.map(tile => (
                <GridListTile key={tile.file_id} component={Link} to={'resepti/' + tile.file_id}>
                    {tile.media_type === 'image' &&
                    <img src={mediaUrl + 'uploads/' + tile.thumbnails.w160} alt={tile.title}/>
                    }
                    <GridListTileBar
                        title={tile.title}
                    />
                </GridListTile>
            ))}
        </GridList>
        </React.Fragment>
    );
};

RecipeGrid.propTypes = {
    picArray: PropTypes.array,
    edit: PropTypes.bool,
    deleteFile: PropTypes.func,
};

export default RecipeGrid;