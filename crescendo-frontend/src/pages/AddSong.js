import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AddSong.css';
import '../images/EmptyStage.jpg';

const AddSong = () => {
    const navigate = useNavigate();
    const [song, setSong] = useState({ title: '', musician: '', notes: '', spotifyTrackId: '', file: null });
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [message, setMessage] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null); // Holds the URL of the uploaded image

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', song.title);
            formData.append('musician', song.musician);
            formData.append('notes', song.notes);
            formData.append('spotifyTrackId', song.spotifyTrackId);
            formData.append('file', song.file);

            const response = await fetch('http://localhost:8080/api/songs/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(song),
            });

            if (response.ok) {
                setMessage('New Song Added');
                navigate('/Dashboard');
                setSong({ title: '', musician: '', notes: '', spotifyTrackId:'' });
            } else {
                setMessage('Failed to add song');
            }
        } catch (error) {
            console.error('Error adding song:', error);
            setMessage('Failed to add song');
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSong({ ...song, file }); // Stores the uploaded file

        // Create a URL for the uploaded image to display a preview for the user
        const imageUrl = URL.createObjectURL(file);
        setUploadedImage(imageUrl);
    };

    const handleSearch = async (searchTerm) => {
        try {
            const accessToken = 'YOUR_ACCESS_TOKEN';
            const encodedSearchTerm = encodeURIComponent(searchTerm);
            const response = await axios.get('https://api.spotify.com/v1/search', {
                params: {
                    q: encodedSearchTerm,
                    type: 'track'
                },
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            const searchResults = response.data.tracks.items.map(item => ({
                id: item.id,
                name: `${item.name} - ${item.artists.map(artist => artist.name).join(', ')}`,
                spotifyTrackId: item.id
            }));

            setSearchResults(searchResults);
        } catch (error) {
            console.error('Error searching Spotify:', error);
        }
    };

    const handleSelectTrack = (spotifyTrackId) => {
        setSong({ ...song, spotifyTrackId });
    };

    return (
        <div className="background-image-container">
            <div className="song-container-big">
                <div className="newSong-div">
                    <h2>Create New Song</h2>
                    <form className="newSongForm" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={song.title}
                            onChange={(e) => setSong({ ...song, title: e.target.value })}
                            placeholder="Title"
                            required
                        />
                        <input
                            type="text"
                            value={song.musician}
                            onChange={(e) => setSong({ ...song, musician: e.target.value })}
                            placeholder="Musician/Show"
                            required
                        />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search Spotify"
                        />
                        <button type="button" onClick={() => handleSearch(query)}>Search</button>
                        <select value={song.spotifyTrackId} onChange={(e) => setSong({ ...song, spotifyTrackId: e.target.value })}>
                            <option value="">Select Track</option>
                            {searchResults.map(result => (
                                <option key={result.id} value={result.spotifyTrackId}>{result.name}</option>
                            ))}
                        </select>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            required
                        />
                        {uploadedImage && <img src={uploadedImage} alt="Uploaded file" />} {/* Displays the uploaded image for the user */}
                        <input
                            type="text"
                            value={song.notes}
                            onChange={(e) => setSong({ ...song, notes: e.target.value })}
                            placeholder="Notes"
                        />
                        <button type="submit" className='create-button'>Create</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default AddSong;

