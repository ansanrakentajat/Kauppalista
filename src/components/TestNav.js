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
                        <Link style={{ flex: '1' }} to="/ruokakomero">
                            <div>
                                <Button>
                                    <Avatar>
                                        <Kitchen />
                                    </Avatar>
                                </Button>
                            </div>
                        </Link>
                        <Link style={{ flex: '1' }} to="/ostoslista">
                            <div>
                                <Button>
                                    <Avatar>
                                        <Receipt />
                                    </Avatar>
                                </Button>
                            </div>
                        </Link>
                        <Link style={{ flex: '1' }} to="/reseptit">
                            <div>
                                <Button>
                                    <Avatar>
                                        <LocalDining />
                                    </Avatar>
                                </Button>
                            </div>
                        </Link>
                        <Link style={{ flex: '1' }} to="/asetukset">
                            <div>
                                <Button>
                                    <Avatar>
                                        <Settings />
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


const testNavStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    width: '100%',
    height: '10vh'
};


export default TestNav;