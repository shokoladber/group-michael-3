import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDropzone } from 'react-dropzone'; // Import the useDropzone hook
import '../styles/AddSong.css';
import '../images/orchestra-center stage (B&W).jpg';


const AddSong = () => {
    const navigate = useNavigate();
    const [song, setSong] = useState({ title: '', musician: '', notes: '', spotifyTrackId: '', file: null });
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [message, setMessage] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null); // Holds the URL of the uploaded image

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setSong({ ...song, file });

        const imageUrl = URL.createObjectURL(file);
        setUploadedImage(imageUrl);

        console.log('Uploaded image URL:', imageUrl); // Log the imageUrl to the console
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop }); // Use the useDropzone hook

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Check if the file type is allowed
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (allowedTypes.includes(file.type)) {
                setSong({ ...song, file }); // Stores the uploaded file
    
                // Create a URL for the uploaded image to display a preview for the user
                const imageUrl = URL.createObjectURL(file);
                setUploadedImage(imageUrl);
            } else {
                alert('Please upload a JPEG, JPG or PNG file.'); // Alert the user if the file type is not allowed
            }
        }
    };
    

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
                setSong({ title: '', musician: '', notes: '', spotifyTrackId: '' });
            } else {
                setMessage('Failed to add song');
            }
        } catch (error) {
            console.error('Error adding song:', error);
            setMessage('Failed to add song');
        }
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
              <div className="input-group">
                <div className="input-row">
                  <input
                    type="text"
                    value={song.title}
                    onChange={(e) => setSong({ ...song, title: e.target.value })}
                    placeholder="Title"
                    required
                    className="input-field"
                  />
                </div>
                <div className="input-row">
                  <input
                    type="text"
                    value={song.musician}
                    onChange={(e) => setSong({ ...song, musician: e.target.value })}
                    placeholder="Musician/Show"
                    required
                    className="input-field"
                  />
                </div>
              </div>
              <div className="input-group">
                <div className="input-row">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search Spotify"
                    className="input-field"
                  />
                  <button type="button" onClick={() => handleSearch(query)} className="search-button">Search</button>
                </div>
                <div className="input-row">
                  <select value={song.spotifyTrackId} onChange={(e) => setSong({ ...song, spotifyTrackId: e.target.value })} className="select-field">
                    <option value="">Select Track</option>
                    {searchResults.map(result => (
                      <option key={result.id} value={result.spotifyTrackId}>{result.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="input-group">
                <div className="image-preview-box">
                  {/* Dropzone text will appear when no image is uploaded */}
                  {!uploadedImage && (
                    <div className="dropzone" {...getRootProps()}>
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p>Drop the files here ...</p>
                      ) : (
                        <p>Drag & drop your sheet music here, or click to select a file</p>
                      )}
                    </div>
                  )}
                  {/* Uploaded image appears */}
                  {uploadedImage && (
                    <img src={uploadedImage} alt="Uploaded file" className="uploaded-image" />
                  )}
                </div>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  value={song.notes}
                  onChange={(e) => setSong({ ...song, notes: e.target.value })}
                  placeholder="Notes"
                  className="input-field notes-input"
                />
                <button type="submit" className="create-button">Create</button>
              </div>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    );
    
};    

export default AddSong;



