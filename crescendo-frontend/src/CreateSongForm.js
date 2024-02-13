import React, { useState } from 'react';
import axios from 'axios';

function CreateSongForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [musician, setMusician] = useState('');
  const [spotifyTrackId, setSpotifyTrackId] = useState('');
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post('/api/searchSpotify', { query });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching Spotify:', error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/songs', { title, musician, spotifyTrackId });
      onCreate();
    } catch (error) {
      console.error('Error creating song:', error);
    }
  };

  return (
    <div>
      <h2>Create New Song</h2>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="text"
          value={musician}
          onChange={(e) => setMusician(e.target.value)}
          placeholder="Musician/Show"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Spotify"
        />
        <button type="button" onClick={handleSearch}>Search</button>
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>
              {result.name} - {result.artist}
              <button type="button" onClick={() => setSpotifyTrackId(result.id)}>Select</button>
            </li>
          ))}
        </ul>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateSongForm;
