import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getSingleMedia } from '../util/MediaAPI';
import { List, ListItem } from '@material-ui/core';
import OneRecipeFooter from '../components/OneRecipeFooter';
import uuid from 'uuid';

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
          available: 'false',
        },
      ],
      desc: [''],
      time: '',
      portions: '',
    },
  };

  testausta = () =>{
    const testimielessä = JSON.parse(JSON.stringify({...this.props.calcPersentage()}));

    console.log('testausta :', testimielessä);
  }



  componentDidMount() {
    const { id } = this.props.match.params;
    getSingleMedia(id).then(pic => {
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

    const { title, filename, media_type } = this.state.file;
    let { description } = this.state.file;
    let ingredients = {
      ingredients: [
        {
          title: 'moro',
        },
      ],
    };

    return (
      <React.Fragment>
        <div style={divstyle}>
          {console.log(media_type)}
          <h1>{title}</h1>
          {media_type.includes('image') &&
            <img src={this.mediaUrl + filename} width={'100%'}
              alt={title}
            />
          }
          <div>
            <div style={ingredientsStyle}>
              {this.state.picJsonParsed.ingredients.map(element => (
                <React.Fragment>
                  <List >
                    <ListItem key={uuid.v4()} style={ingredientsStyle}>{element.amount +
                      ' ' + element.unit + ' ' + element.title}</ListItem>
                  </List>
                </React.Fragment>
              ))}
            </div>
            <div style={descStyle}>
              {this.state.picJsonParsed.desc.map(element => (
                <React.Fragment>
                  <List>
                    <ListItem key={uuid.v4()} style={ingredientsStyle}>{element}</ListItem>
                  </List>
                </React.Fragment>
              ))}
            </div>
          </div>
          <OneRecipeFooter goBack={this.props.history} />
        </div>
      </React.Fragment>
    );
  }
}
const divstyle = {
  height: '80vh',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column'
};
const ingredientsStyle = {
  padding: '1px',
  paddingLeft: '10px'
};

const descStyle = {
  padding: '10px',
  marginBottom: '15px',
};


OneRecipe.propTypes = {
  match: PropTypes.object,
  user: PropTypes.object,
  history: PropTypes.object,
  goBack: PropTypes.func,
};

export default OneRecipe;