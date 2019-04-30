import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Avatar, Button } from '@material-ui/core';
import { Kitchen, Receipt, LocalDining, Settings } from '@material-ui/icons';


class TestNav extends Component {
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
                    <div style={{ display: 'flex' }}>
                        <Link style={{ flex: '1' }} to="/ruokakomero">
                            <div>
                                <Button onClick={() => { this.setActive('ruokakomero') }}>
                                    <Avatar style={{backgroundColor: this.state.active === 'ruokakomero' ? 'blue' : ''}}>
                                        <Kitchen/>
                                    </Avatar>
                                </Button>
                            </div>
                        </Link>
                        <Link style={{ flex: '1' }} to="/ostoslista">
                            <div>
                                <Button onClick={() => { this.setActive('ostoslista') }}>
                                    <Avatar style={{backgroundColor: this.state.active === 'ostoslista' ? 'blue' : ''}}>
                                        <Receipt/>
                                    </Avatar>
                                </Button>
                            </div>
                        </Link>
                        <Link style={{ flex: '1' }} to="/reseptit">
                            <div>
                                <Button onClick={() => { this.setActive('reseptit') }}>
                                    <Avatar style={{backgroundColor: this.state.active === 'reseptit' ? 'blue' : ''}}>
                                        <LocalDining/>
                                    </Avatar>
                                </Button>
                            </div>
                        </Link>
                        <Link style={{ flex: '1' }} to="/asetukset">
                            <div>
                                <Button onClick={() => { this.setActive('asetukset') }}>
                                    <Avatar style={{backgroundColor: this.state.active === 'asetukset' ? 'blue' : ''}}>
                                        <Settings/>
                                    </Avatar>
                                </Button>
                            </div>
                        </Link>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}


/* <Button onClick={() => { this.setActive('ostoslista') }}>
                                    <Avatar>
                                        <Receipt color={this.state.active === 'ostoslista' ? 'primary' : 'disabled'} />
                                    </Avatar>
                                </Button> */

const testNavStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    width: '100%',
    height: '10vh'
};


export default TestNav;