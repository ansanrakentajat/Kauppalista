import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Avatar, Button } from '@material-ui/core';
import { Kitchen, Receipt, LocalDining, Settings } from '@material-ui/icons';


class TestNav extends Component {
    render() {
        return (
            <React.Fragment>
                <nav style={testNavStyle}>
                    <div style={{ display: 'flex' }}>
                        <Link style={{ flex: '1' }} to="/ruokakomero"><div><Button><Avatar><Kitchen /></Avatar></Button></div></Link>
                        <Button onClick={this.props.sendToDescription}>Send state to description</Button>
                        <Link style={{ flex: '1' }} to="/ostoslista"><div><Button><Avatar><Receipt /></Avatar></Button></div></Link>
                        <Link style={{ flex: '1' }} to="/reseptit"><div><Button><Avatar><LocalDining /></Avatar></Button></div></Link>
                        <Button onClick={this.props.fetchFromDescription}>Fetch state from description</Button>
                        <Link style={{ flex: '1' }} to="/asetukset"><div><Button><Avatar><Settings /></Avatar></Button></div></Link>
                        
                        
                    </div>
                    <div style={{ display: 'none' }}>
                        <h1>Kauppalista</h1>
                        <button onClick={this.props.sendToDescription}>Send state to description</button>
                        <Link style={linkStyle} to="/">Home</Link> |<Link
                            style={linkStyle} to="/about">About</Link>
                        <button onClick={this.props.fetchFromDescription}>Fetch state from description</button>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}


const testNavStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px',
    width: '100%',
    height: '10vh'

};

const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
};


export default TestNav;