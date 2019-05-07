import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getSingleMedia, /*getDescription*/} from '../util/MediaAPI';
import {Button} from '@material-ui/core';
//import Ingredients from '../components/Ingredients';
import  uuid from 'uuid';

class OneRecipe extends Component {
    mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
    state = {
        file: {
            filename: '',
            title: '',
            description: '[d][/d][f][/f]',
            media_type: 'image/jpg',
            user_id: 1,
        },
        picJsonParsed: {
            ingredients: [
                {
                    title: '',
                    amount: '',
                    unit: '',
                    available: 'false'
                }
                ],
            desc: [''],
            time: '',
            portions: ''
        }
    };

    componentDidMount() {
        const {id} = this.props.match.params;
        getSingleMedia(id).then(pic => {
            console.log('pic', pic);
            console.log('json parse pic', JSON.parse(pic.description));
            const picJsonParsed = JSON.parse((pic.description));

            this.setState({
                file: pic,
                picJsonParsed,
            }, () => {
                console.log('state', this.state);
            });
        });
    }

    render() {
        const {title, filename, media_type} = this.state.file;
        //let {description} = this.state.file;
        console.log(this.state, 'ville sanoo moi');
        //description = description.substring(1, description.length-1);
        /*let ingredients = {
            ingredients: [
                {
                    title: "moro"
                }
            ]
        };*/
        /*try {
            ingredients = JSON.parse(description);
        } catch (e) {
            console.log(e)
        }*/
        //TÄMÄ MENEE ALAS <p> KOHTAAN
        //{seppo.ingredients[0].title}
        return (
            <React.Fragment>
                <Button onClick={this.props.history.goBack}>Back</Button>
                {console.log(media_type)}
                <h1>{title}</h1>
                {media_type.includes('image') &&
                <img src={this.mediaUrl + filename} width={"100%"}
                     alt={title}
                />
                }
                <div>
                    {this.state.picJsonParsed.ingredients.map(element => (
                        <React.Fragment>
                            <p key={uuid.v4()}>{element.title + ' ' + element.amount + ' ' + element.unit}</p>
                        </React.Fragment>
                    ))}
                    <br/>
                    {this.state.picJsonParsed.desc.map(element => (
                        <React.Fragment>
                            <p key={uuid.v4()}>{element}</p>
                        </React.Fragment>
                    ))}
                </div>
            </React.Fragment>
        );
    }

}

/*{ingredients.ingredients[0].title}
                    <Ingredients resepti={ingredients} />*/

OneRecipe.propTypes = {
    match: PropTypes.object,
    user: PropTypes.object,
    history: PropTypes.object,
};

export default OneRecipe;