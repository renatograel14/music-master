import React, { Component } from 'react';
import './App.css';



class Profile extends Component {

    getGenres() {
    }

    render() {
        let artist = { name: '', followers: { total: '' }, images: [{ url: '' }], genres: [] }
        artist = this.props.artist ? this.props.artist : artist;
        return (
            <div className="profile">
                <div className="profile-img" style={{ backgroundImage: 'url(' + artist.images[0].url + ')' }}> </div>
                <section className="profile-info">
                    <h3>{artist.name}</h3>
                    <p>{artist.followers.total} followers</p>
                    <p>
                        {artist.genres.join(", ")}
                    </p>
                </section>
            </div>
        )
    }
}

export default Profile;