import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import './App.css';



class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentAudioUrl: '',
            audio: null,
            playing: false
        }
    }

    playAudio(audioUrl) {
        let audio = new Audio(audioUrl);
        if (!this.state.playing) {
            audio.play();
            this.setState({ playing: true, currentAudioUrl: audioUrl, audio })
        } else {
            if (this.state.currentAudioUrl === audioUrl) {
                this.state.audio.pause();
                this.setState({ playing: false });
            } else {
                this.state.audio.pause();
                audio.play();
                this.setState({ playing: true, currentAudioUrl: audioUrl, audio })
            }
        }
    }


    render() {
        let { tracks } = this.props;
        return (
            <div className="gallery">
                {
                    tracks.map((track, k) => {
                        const trackImg = track.album.images[0].url
                        return (
                            <div key={k} className="track" onClick={() => this.playAudio(track.preview_url)}>
                                <div className="track-play">
                                    {
                                        track.preview_url ?
                                            this.state.currentAudioUrl === track.preview_url &&
                                                this.state.playing ?
                                                <Glyphicon glyph="pause" />
                                                :
                                                <Glyphicon glyph="play" />
                                            : <span className="warning"> No track available </span>
                                    }
                                </div>
                                <img src={trackImg} alt="" className="track-img" />
                                <p className="track-title">{track.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Gallery;