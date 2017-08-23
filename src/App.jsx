import './App.css';

import { parse } from 'querystring';
import React, { Component } from 'react';
import { FormControl, FormGroup, Glyphicon, InputGroup } from 'react-bootstrap';

import Login from './Login';
import Profile from './Profile';
import Gallery from './Gallery';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null,
            tracks: [],
            accessToken: null
        }
    }

    search() {
        const BASE_URL = 'https://api.spotify.com/v1';
        const ARTIST_URL = `${BASE_URL}/search?q=${this.state.query}&type=artist&limit=1`;
        let ALBUM_URL = `${BASE_URL}/artists/`;


        var accessToken = this.state.accessToken;


        var myOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            mode: 'cors',
            cache: 'default'
        };

        function handleErrors(response) {
            if (response.error) {
                throw Error(JSON.stringify(response.error.message));
            }
            return response;
        }


        if (accessToken) {
            fetch(ARTIST_URL, myOptions)
                .then(response => response.json())
                .then(handleErrors)
                .then(result => result.artists.items)
                .then(artists => {
                    let artist = {};
                    if (artists.length > 0) {
                        artist = artists[0];

                        ALBUM_URL += `${artist.id}/top-tracks?country=US`

                        fetch(ALBUM_URL, myOptions)
                            .then(response => response.json())
                            .then(result => {
                                const { tracks } = result;
                                this.setState({ tracks })
                            });
                    }
                    this.setState({ artist, notFound: artists.length === 0 });
                })
                .catch(err => {
                    if (err.status === 401) {
                        this.setState({ accessToken: null })
                    }
                    alert(err.message);
                });
        } else {
            alert('please, loggin first');
            return;
        }
    }

    componentWillMount() {
        let urlParams = this.props.location.hash;
        let queryParams = parse(urlParams.substr(urlParams.indexOf("#") + 1));

        this.setState({
            accessToken: queryParams['access_token']
        })

    }

    render() {
        return (
            <div className="container">
                {
                    this.state.accessToken ?
                        <span className="login-btn"> Welcome! </span>
                        : <Login />

                }
                <div className="clr"></div>
                <h1 className="app-title">Music master</h1>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="search an artist..."
                            value={this.state.query}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    this.search();
                                }
                            }}
                            onChange={event => this.setState({ query: event.target.value })} />
                        <InputGroup.Addon onClick={() => this.search()}>
                            <Glyphicon glyph="search"></Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>

                <article style={{ textAlign: 'center' }}>
                    {
                        this.state.artist ?
                            this.state.notFound ? <span> No artist found </span>
                                :
                                <section>
                                    <Profile artist={this.state.artist} />
                                    <Gallery tracks={this.state.tracks} />
                                </section>
                            : <span>Search for something!</span>
                    }
                </article>
            </div>
        )
    };
}

export const APP_NAME = 'Music Master';
export default App;