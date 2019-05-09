import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

class OneRecipeFooter extends Component{
  render() {
      return (
          <div style={footerStyle}>
            <Button style={buttonStyle} onClick={this.props.goBack}>Back</Button>
          </div>
      );
  }
}
const footerStyle = {
  width: '100%',
  height: '10vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#333',
  position: 'absolute',
  bottom: '0'
};
const buttonStyle = {
  color: '#fff'
};
OneRecipeFooter.propTypes ={
  history: PropTypes.object,
}

export default OneRecipeFooter;