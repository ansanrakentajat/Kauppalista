import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddItem extends Component {
    
    state= {
        title: '',
        amount: '',
        unit: ''

    }
    
    handleOnSubmit = (e) => {
        e.preventDefault();
        this.props.addItem(this.state.title, this.state.amount, this.state.unit);
        this.setState({title: '', amount: '', unit: ''});
    }

    handleOnChange = (e) => this.setState({ [e.target.name]: e.target.value });


    render() {
        return (
            <React.Fragment>
               <form style={{display: 'flex'}} onSubmit={this.handleOnSubmit}>
                   <input type="text" name="title" placeholder="Item title" style={{flex: '10'}} value={this.state.title} onChange={this.handleOnChange}/>
                   <input type="number" name="amount" placeholder="Amount" value={this.state.amount} onChange={this.handleOnChange}/>
                   <select name="unit"  onChange={this.handleOnChange} placeholder={this.state.unit}>
                       <option value="l">Litra</option>
                       <option value="dl">Desilitra</option>
                       <option value="ml">Millilitra</option>
                       <option value="kg">Kilogramma</option>
                       <option value="g">Gramma</option>
                       <option value="kpl">Kappale</option>
                       <option value="pss">Pussi</option>
                       <option value="pkt">Paketti</option>
                   </select>
                   <input type="submit" value="Submit" className="btn" style={{flex: '1', padding: '5px'}}/>
               </form>
            </React.Fragment>
        )
    }
}

AddItem.propTypes = {
    addItem: PropTypes.func.isRequired
}

export default AddItem
