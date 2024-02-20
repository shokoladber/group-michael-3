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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Submit form data including the file
            const formData = new FormData();
            formData.append('title', song.title);
            formData.append('musician', song.musician);
            formData.append('notes', song.notes);
            formData.append('spotifyTrackId', song.spotifyTrackId);
            formData.append('file', song.file);

            const response = await axios.post('http://localhost:8080/api/songs/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                setMessage('New Song Added');
                navigate('/');
                setSong({ title: '', musician: '', notes: '', spotifyTrackId: '', file: null });
            } else {
                setMessage('Failed to add song');
            }
        } catch (error) {
            console.error('Error adding song:', error);
            setMessage('Failed to add song');
        }
    };

    const handleFileChange = (event) => {
        setSong({ ...song, file: event.target.files[0] });
    };

    const handleSearch = async (searchTerm) => {
        try {
            const accessToken = 'BQC-8JTssCLHoNjUudgj6CGr5mEnA27hX711-pT0Xj3QMGSWz6o8cSBtTI974Ouh6-UkbsvN1tzZx0_m8XL5KhcuX2-0qhRUBVG6-ADiuvFSEwNdyLjOaAHxJCa8yDyUvEdNScph2fTR8NMQglWmk8DJGFmrjFpafQi_AUxa0jgculCav0rYVb9ykZRCZCZkbT_Tt3jEmnmexjsFkCSRPkj9PvVQtuB-zNWBAwwsWHcPQaOygSRn9eecyQ';
            const encodedSearchTerm = encodeURIComponent(searchTerm); // Encode the search term
            const response = await axios.get('https://api.spotify.com/v1/search', {
                params: {
                    q: encodedSearchTerm, // Use the encoded search term
                    type: 'track'
                },
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
    
            const searchResults = response.data.tracks.items.map(item => ({
                id: item.id,
                name: `${item.name} - ${item.artists.map(artist => artist.name).join(', ')}`, // Concatenate track name and artists
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
