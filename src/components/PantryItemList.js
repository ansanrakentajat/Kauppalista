import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PantryItem from './PantryItem';
import { Table, TableBody } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

class PantryItemList extends Component {
    render() {
        return (
            <React.Fragment>
                <div style={divStyle}>
                    <Paper>
                        <Table>
                            <TableBody>
                                {this.props.stateToPantry.pantry.map(element => (
                                    <PantryItem key={element.id} changePantryTitle={this.props.changePantryTitle} elementToPantryItem={element} deletePantryItem={this.props.deletePantryItem} />
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </React.Fragment>
        )
    }
}

/*
<React.Fragment>
                <div style={divStyle}>
                    <Paper>
                        <List>
                            {this.props.stateToPantry.pantry.map(element => (
                                <PantryItem key={element.id} elementToPantryItem={element} />
                            )
                            )}
                        </List>
                    </Paper>
                </div>
            </React.Fragment>
*/

const divStyle = {
    width: '90%',
    height: '90vh',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
};


PantryItemList.propTypes = {
    stateToPantry: PropTypes.object,
    deletePantryItem: PropTypes.func
};

export default PantryItemList
