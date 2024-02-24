import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditSong = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState({
    title: '',
    musician: '',
    notes: '',
    spotifyTrackId: '',
    file:null
  });
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchSongDetails();
  }, []);

  const fetchSongDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/songs/${id}`);
      setSong(response.data);
    } catch (error) {
      console.error('Failed to fetch song details:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSong(prevSong => ({
      ...prevSong,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setSong({ ...song, file: e.target.files[0] }); // Update the file in the song state
  };


  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('title', song.title);
      formData.append('musician', song.musician);
      formData.append('notes', song.notes);
      formData.append('spotifyTrackId', song.spotifyTrackId);
      formData.append('file', song.file); 

      await axios.put(`http://localhost:8080/api/songs/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/EditLibrary');
    } catch (error) {
      console.error('Failed to save changes:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const accessToken = 'BQDxto2vruoVqZPca7za9Our5QGxJjnfmvqsjaik3wmVOBjQNUPLC4Q2PyaQ17YBn5rb8I-AOw7bSbMMSrNRh9lj0ntz3uGfdNu0lUj8KtNzMRLTWDxlGGLYT2AriON8mW-ODAkNbfDzpgzYO1yAAm51XWEstDIS6u6BGDkzg2QPsi3iV37TQ2PjWbWGR-2jaHFj1OzEpSHIJxD14lyOEUCKO4x26-f5Er7EGEAdpFP8EhmqSbthZCG7Fw'; // Replace with your Spotify access token
      const encodedSearchTerm = encodeURIComponent(query);
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
    <div>
      <h2>Edit Song</h2>
      <form onSubmit={handleSave}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={song.title}
          onChange={handleInputChange}
        />
        <label>Musician:</label>
        <input
          type="text"
          name="musician"
          value={song.musician}
          onChange={handleInputChange}
        />
        <label>Notes:</label>
        <input
          type="text"
          name="notes"
          value={song.notes}
          onChange={handleInputChange}
        />
        <label>Spotify:</label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Spotify"
        />
        <button type="button" onClick={handleSearch}>Search</button>
        <select value={song.spotifyTrackId} onChange={(e) => handleSelectTrack(e.target.value)}>
          <option value="">Select Track</option>
          {searchResults.map(result => (
            <option key={result.id} value={result.spotifyTrackId}>{result.name}</option>
          ))}
        </select>
        <label>File:</label>
        <input
          type="file"
          onChange={handleFileChange}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditSong;
