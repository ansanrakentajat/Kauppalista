import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PantryItem from './PantryItem';
import { Table, TableBody, Paper } from '@material-ui/core';


class PantryItemList extends Component {
    render() {
        return (
            <React.Fragment>
                <Paper>
                    <Table>
                        <TableBody>
                            {this.props.stateToPantry.pantry.map(element => (
                                <PantryItem key={element.id} changePantryTitle={this.props.changePantryTitle} elementToPantryItem={element} deletePantryItem={this.props.deletePantryItem} />
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </React.Fragment>
        )
    }
}


PantryItemList.propTypes = {
    stateToPantry: PropTypes.object,
    deletePantryItem: PropTypes.func
};

export default PantryItemList
