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

    let arrayOfIngredients = JSON.parse(JSON.stringify(props.picArray.map(resepti => JSON.parse(resepti.description).ingredients)));
    console.log(arrayOfIngredients, 'arrayOfIngredients');
    // otetaan deep copy statePantry:sta, jottei tämä toiminto mutantoi App:n statea
    const arrayOfPantryItems = JSON.parse(JSON.stringify(props.statePantry));
    console.log('arrayOfPantryItems :', arrayOfPantryItems);
    const setOfPantryTitles = new Set(arrayOfPantryItems.map(item => item.title));
    console.log('setOfPantryTitles :', setOfPantryTitles);
    // tehdään array, johon laitetaan useampi array. Nämä arrayt sisältävät kaikki samannimiset ruokakomeron rivit
    const arrayByTitle = [];
    // loopataan setOfUniqueTitles läpi ja kullakin kierroksella luodaan array, johon filteröity sen kierroksen samannimiset ruokakomeron rivit
    setOfPantryTitles.forEach((uniqueTitle) => {
        const tempArray = [...arrayOfPantryItems.filter(item => item.title === uniqueTitle)];
        arrayByTitle.push(tempArray);
    });
    console.log('arrayByTitle :', arrayByTitle);
    // luodaan array, johon laitetaan arrayt ruokakomeron samannimisistä ja samanyksikköisistä objekteista.
    const sameTitleAndUnitArray = [];
    // loopataan arrayByTitle läpi ja joka kierroksella luodaan uusi Set-objekti sen uniikeista yksiköistä
    arrayByTitle.forEach((tuote) => {
        const uniqueUnitSet = new Set(tuote.map(item => item.unit));
        // loopataan tietyn tuotteen uniikit yksiköt ja filteröidään sieltä tuotteet arrayna, jolla on sama yksikkö kuin kierroksella. 
        uniqueUnitSet.forEach(uniqueUnit => {
            const sameUnit = tuote.filter(item => item.unit === uniqueUnit);
            sameTitleAndUnitArray.push(sameUnit);
        });
    });
    console.log('sameTitleAndUnitArray :', sameTitleAndUnitArray);
    // luodaan array, johon laitetaan valmiit summatut ruokakomeron objektit. Objektilla on uniikki nimi-yksikköpari ja sen määrä on summa kyseisten tuotteiden määristä.
    const productsForCompareArray = [];
    sameTitleAndUnitArray.forEach(tuote => {
        const tempObject = tuote.reduce((summa, summattava) => {
            // muutetaan ensimmäinen objektin amount numeroksi, koska se on String
            Number(summa.amount);
            // summataan objektien numeroiksi muutetut määrät
            summa.amount = Number(summa.amount) + Number(summattava.amount);
            // palautetaan ensimmäisen objekti, jonka määrä on summa
            return summa;
        });
        productsForCompareArray.push(tempObject);
    });

    console.log('productsForCompareArray :', productsForCompareArray);
    // ------------------------- TÄSSÄ VAIHEESSA RUOKAKOMERON TAVARAT ON SUMMATTU JA VOIDAAN SIIRTYÄ VERTAILUUN----------------------------------------------------
    console.log('arrayOfIngredients :', arrayOfIngredients);

    arrayOfIngredients = arrayOfIngredients.map(resepti => {
        const uusiResepti = resepti.map(ainesosa => {
            productsForCompareArray.map(product => {
                if (ainesosa.title === product.title && ainesosa.unit === product.unit && Number(ainesosa.amount) <= Number(product.amount)) {
                    ainesosa.available = true;
                }
                return 'tällä ei ole mitään väliä';
            })
            return ainesosa;
        });
        return uusiResepti;
    });
    //console.log('arrayOfIngredients :', arrayOfIngredients);
    const testi = arrayOfIngredients.map(resepti => {
        return resepti.map(ainesosa => {
            return ainesosa.available === true ? 1 : 0
        });
    });
    //console.log('testi :', testi);
    const testi2 = testi.map(oneZeroArray => {
        let howManyOnes = 0;
        oneZeroArray.map(element => {
            if (element === 1) {
                howManyOnes++
            }
            return element
        });
        console.log('howManyOnes :', howManyOnes);
        return howManyOnes / oneZeroArray.length;
    });
    //console.log('testi2 :', testi2);
    const testi3 = testi2.map(value => { return ((value * 100).toFixed(2)) + ' %' });
    console.log('testi3 :', testi3);
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
                            title={`${tile.title} ${testi3[indeksi]}`}
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