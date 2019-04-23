import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Send } from '@material-ui/icons';

class Login extends Component {
    state = {
        user: {
            username: '',
            password: '',
            email: '',
            full_name: '',
            repeatPassword: '',
        },
        message: '',
        formToggler: true,
        validUser: true,
    };

    render() {
        return (
            <React.Fragment>

                <form>
                    <h1>Login</h1>
                    <form onSubmit={this.handleLoginSubmit}>
                        <TextField fullWidth required name="username" id="username"
                            label="Username"
                            value={this.state.user.username}
                            onChange={this.handleInputChange} />
                        <TextField fullWidth required name="password" type="password"
                            id="password"
                            label="Password"
                            value={this.state.user.password}
                            onChange={this.handleInputChange} />
                        <Button variant="contained"
                            color="secondary" type="submit">
                            <Send />&nbsp;Login
              </Button>
                    </form>
                </form>

            </React.Fragment>
        )
    }
}

export default Login
