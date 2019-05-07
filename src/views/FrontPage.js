import React from 'react';
import { Link } from 'react-router-dom';

 const FrontPage = () => {
  return (
    <React.Fragment>
        <div style={frontPageStyle}>
            <div style={menuStyle}><Link to="/ruokakomero" style={linkStyle}>RUOKAKOMERO</Link></div>
            <div style={menuStyle}><Link to="/reseptit" style={linkStyle}>RESEPTIT</Link></div>
            <div style={menuStyle}><Link to="/kauppalista" style={linkStyle}>KAUPPALISTA</Link></div>
        </div>
    </React.Fragment>
  )
}

const frontPageStyle = {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly'
};

const menuStyle = {
    width: '50%',
    height: '20%',
    backgroundColor: '#111',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const linkStyle = {
    padding: '20%',
    color: '#fff',
    textDecoration: 'none'
}

export default FrontPage;