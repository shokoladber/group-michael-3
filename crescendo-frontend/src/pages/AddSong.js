import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone'; // Importing Dropzone
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

            const response = await fetch('http://localhost:8080/api/songs/add', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setMessage('New Song Added');
                navigate('/SongTable'); // Navigate to the list of songs page
                setSong({ title: '', musician: '', notes: '', spotifyTrackId:'' }); // Clear the form fields after successful addition
            } else {
                setMessage('Failed to add song');
            }
        } catch (error) {
            console.error('Error adding song:', error);
            setMessage('Failed to add song');
        }
    };

    const handleFileChange = (acceptedFiles) => {
        setSong({ ...song, file: acceptedFiles[0] });
    };

    // Adding for dropzone
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleFileChange,
        accept: 'image/jpeg, image/png', 
        maxFiles: 1 // limit the number of files to 1
    });

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
        <div className="background-image-container containerForSongTable">
            <div className="song-container-big">
                <div className="newSong-div">
                    <h2>Create New Song</h2>
                    <form className="newSongForm" onSubmit={handleSubmit}>
                        <div className="input-field">
                            <input
                                type="text"
                                value={song.title}
                                onChange={(e) => setSong({ ...song, title: e.target.value })}
                                placeholder="Title"
                                required
                            />
                        </div>
                        <div className="input-field">
                            <input
                                type="text"
                                value={song.musician}
                                onChange={(e) => setSong({ ...song, musician: e.target.value })}
                                placeholder="Musician/Show"
                                required
                            />
                        </div>
                        <div className="input-field">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search Spotify"
                            />
                            <button type="button" onClick={() => handleSearch(query)}>Search</button>
                        </div>
                        <div className="input-field">
                            <select value={song.spotifyTrackId} onChange={(e) => setSong({ ...song, spotifyTrackId: e.target.value })}>
                                <option value="">Select Track</option>
                                {searchResults.map(result => (
                                    <option key={result.id} value={result.spotifyTrackId}>{result.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-field">
                            {/* Dropzone and image preview */}
                            <div {...getRootProps()} className={`image-preview-box ${isDragActive ? 'active' : ''}`}>
                                <input {...getInputProps()} />
                                {song.file ? (
                                    <img src={URL.createObjectURL(song.file)} alt="Preview" />
                                ) : (
                                    <p>Drag 'n' drop an image file here, or click to select an image</p>
                                )}
                            </div>                           
                        </div>
                        <div className="input-field">
                            <input
                                type="text"
                                value={song.notes}
                                onChange={(e) => setSong({ ...song, notes: e.target.value })}
                                placeholder="Notes"
                            />
                        </div>
                        <button type="submit" className='create-button'>Create</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default AddSong;
