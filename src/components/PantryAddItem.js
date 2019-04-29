import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Select, MenuItem, Button} from '@material-ui/core';

class PantryAddItem extends Component {

    state = {
        title: '',
        amount: '',
        unit: ''
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        const alkukirjain = this.state.title[0].toUpperCase();
        const muutKirjaimet = this.state.title.slice(1);
        const isollaAlkukirjaimella = alkukirjain + muutKirjaimet;
        console.log('alkukirjain :', alkukirjain);
        console.log('muutKirjaimet :', muutKirjaimet);
        console.log('isollaAlkukirjaimella :', isollaAlkukirjaimella);
        console.log(isollaAlkukirjaimella, this.state.amount, this.state.unit);
        
        this.props.addPantryItem(isollaAlkukirjaimella, this.state.amount, this.state.unit);
        this.setState({ title: '', amount: '', unit: '' });
    }

    handleOnChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <React.Fragment>
                <form style={{ width: '90%', margin: 'auto', display: 'flex', flexWrap: 'wrap' }} onSubmit={this.handleOnSubmit}>
                    <Input required type="text" name="title" placeholder="Item title" style={{ flex: '1' }} value={this.state.title} onChange={this.handleOnChange} />
                    <Input required type="number" name="amount" placeholder="Amount" style={{ flex: '1' }} value={this.state.amount} onChange={this.handleOnChange} />
                    <Select required name="unit" value={this.state.unit} onChange={this.handleOnChange} style={{ flex: '1' }} placeholder={this.state.unit}>
                        <MenuItem value="l">Litra</MenuItem>
                        <MenuItem value="dl">Desilitra</MenuItem>
                        <MenuItem value="ml">Millilitra</MenuItem>
                        <MenuItem value="kg">Kilogramma</MenuItem>
                        <MenuItem value="g">Gramma</MenuItem>
                        <MenuItem value="kpl">Kappale</MenuItem>
                        <MenuItem value="pss">Pussi</MenuItem>
                        <MenuItem value="pkt">Paketti</MenuItem>
                    </Select>
                    <Button variant="contained" type="submit" value="Submit" className="btn" style={{ flex: '1', padding: '5px' }}>Submit</Button>
                </form>
            </React.Fragment>
        )
    }
}

PantryAddItem.propTypes = {
    addPantryItem: PropTypes.func
}

export default PantryAddItem
