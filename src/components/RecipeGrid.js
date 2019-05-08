import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    GridList,
    GridListTile,
    GridListTileBar,
} from '@material-ui/core';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/';

const RecipeGrid = (props) => {

    const testausta = JSON.parse(JSON.stringify(props.calcPersentage()));

    console.log(testausta);
    const testi3 = [...testausta[1]];
    let indeksi = -1;



    return (
        <React.Fragment>
            <GridList>
                {props.picArray.map(tile => {
                    indeksi++; console.log(indeksi);
                    return <GridListTile key={tile.file_id} component={Link} to={'resepti/' + tile.file_id}>
                        {tile.media_type === 'image' &&
                            <img src={mediaUrl + 'uploads/' + tile.thumbnails.w160} alt={tile.title} />
                        }
                        <GridListTileBar
                            title={`${tile.title}
                            ${testi3[indeksi]}`}
                        />
                    </GridListTile>
                }
                )}
            </GridList>
        </React.Fragment>
    );
};

RecipeGrid.propTypes = {
    picArray: PropTypes.array,
    edit: PropTypes.bool,
    deleteFile: PropTypes.func,
    statePantry: PropTypes.array,
};

export default RecipeGrid;