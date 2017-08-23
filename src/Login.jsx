import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import './App.css';
import { stringify } from 'querystring'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: props.isLoggedIn
        };
    }
    login() {

        var generateRandomString = (length) => {
            var text = '';
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

            for (var i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };

        const client_id = '6927edd19dcc4aeb99a32097de204986'; // Your client id
        const redirect_uri = 'http://localhost:3000/'; // Your redirect uri
        const scope = 'user-read-private user-read-email';
        const state = generateRandomString(16);

        const login_uri = 'https://accounts.spotify.com/authorize?';
        const fetch_uri = login_uri + stringify({
            response_type: 'token',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        });

        window.location = fetch_uri;

    }

    render() {
        return (
            <Button className="login-btn" onClick={() => this.login()}>Login</Button>
        )
    };
}

export default Login;