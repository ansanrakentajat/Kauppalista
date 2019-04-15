import React from 'react'
import { Link } from 'react-router-dom';

const TestNav = () => {
    return (
        <nav style={testNavStyle}>
            <h1>Kauppalista</h1>
            <Link style={linkStyle} to="/">Home</Link> |<Link
                style={linkStyle} to="/about">About</Link>
        </nav>
    )
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