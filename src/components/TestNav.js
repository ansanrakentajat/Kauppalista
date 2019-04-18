import React, { Component } from 'react'
import { Link } from 'react-router-dom';


class TestNav extends Component {
    render() {
        return (
            <React.Fragment>
                <nav style={testNavStyle}>
                    <h1>Kauppalista</h1>
                    <button onClick={this.props.sendToDescription}>Send state to description</button>
                    <Link style={linkStyle} to="/">Home</Link> |<Link
                        style={linkStyle} to="/about">About</Link>
                    <button onClick={this.props.fetchFromDescription}>Fetch state from description</button>
                </nav>
            </React.Fragment>
        )
    }
}


const testNavStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
};

const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
};

export default TestNav;