import React, { Component } from 'react'

class AddItem extends Component {
    
    state= {
        title: ''
    }
    

    handleOnSubmit = (e) => {
        e.preventDefault();
        this.props.addItem(this.state.title);
        this.setState({title: ''});
    }

    handleOnChange = (e) => this.setState({ [e.target.name]: e.target.value });


    render() {
        return (
            <React.Fragment>
               <form style={{display: 'flex'}} onSubmit={this.handleOnSubmit}>
                   <input type="text" name="title" placeholder="Add Item..." style={{flex: '10'}} value={this.state.title} onChange={this.handleOnChange} />
                   <input type="submit" value="Submit" className="btn" style={{flex: '1', padding: '5px'}}/>
               </form>
            </React.Fragment>
        )
    }
}

export default AddItem
