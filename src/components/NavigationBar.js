import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Avatar, Button } from '@material-ui/core';
import { Kitchen, Receipt, LocalDining, Settings } from '@material-ui/icons';


class NavigationBar extends Component {
    state = {
        active: 'ostoslista'
    }

    setActive = (selected) => {
        this.setState({ active: selected })
    }


    render() {
        return (
            <React.Fragment>
                <nav style={testNavStyle}>
                        <Link style={{ flex: '1' }} to="/ruokakomero">
                            <div>
                                <Button onClick={() => { this.setActive('ruokakomero') }}>
                                    <Avatar style={{ backgroundColor: this.state.active === 'ruokakomero' ? 'green' : '' }}>
                                        <Kitchen />
                                    </Avatar>
                                </Button>
                            </div>
                        </Link>
                        <Link style={{ flex: '1' }} to="/ostoslista">
                            <div>
                                <Button onClick={() => { this.setActive('ostoslista') }}>
                                    <Avatar style={{ backgroundColor: this.state.active === 'ostoslista' ? 'green' : '' }}>
                                        <Receipt />
                                    </Avatar>
                                </Button>
                            </div>
                        </Link>
                        <Link style={{ flex: '1' }} to="/reseptit">
                            <div>
                                <Button onClick={() => { this.setActive('reseptit') }}>
                                    <Avatar style={{ backgroundColor: this.state.active === 'reseptit' ? 'green' : '' }}>
                                        <LocalDining />
                                    </Avatar>
                                </Button>
                            </div>
                        </Link>
                        <Link style={{ flex: '1' }} to="/asetukset">
                            <div>
                                <Button onClick={() => { this.setActive('asetukset') }}>
                                    <Avatar style={{ backgroundColor: this.state.active === 'asetukset' ? 'green' : '' }}>
                                        <Settings />
                                    </Avatar>
                                </Button>
                            </div>
                        </Link>
                </nav>
            </React.Fragment>
        )
    }
}


// TÄMÄ ALLA OLEVA ON VAIHTOEHTOINEN
/* 
<Button onClick={() => { this.setActive('ostoslista') }}>
    <Avatar>
        <Receipt color={this.state.active === 'ostoslista' ? 'primary' : 'disabled'} />
    </Avatar>
</Button>
*/

const testNavStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    width: '100vw',
    height: '10vh',
    display: 'flex'
};


export default NavigationBar;