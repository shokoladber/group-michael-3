import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../styles/SongTable.css';
import EditLibrary from './EditLibrary'; // Import EditLibrary component

const SongTable = () => {
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showListAllButton, setShowListAllButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/songs/list');
      if (response.ok) {
        const data = await response.json();
        setFilteredSongs(data);
        setShowListAllButton(false);
      } else {
        console.error('Failed to get songs');
      }
    } catch (error) {
      console.error('Failed to fetch songs', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/songs/search?keyword=${searchTerm}`);
      setFilteredSongs(response.data);
      setShowListAllButton(true);
    } catch (error) {
      console.error('Error searching songs:', error);
    }
  };

  const handleAddSong = () => {
    navigate('/addSong');
  };

  const handleListAll = () => {
    fetchSongs();
    setSearchTerm('');
    setShowListAllButton(false);
  };

  const getSpotifyLink = (trackId) => {
    return `https://open.spotify.com/track/${trackId}`;
  };

  return (
    <div className="containerForSongTable">
  <h2 className="text-center">Your Music Repertoire</h2>
  
  <div className="search-container">
    <div className="search-input">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Search By Song Title..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button className="btn btn-primary mb-2" onClick={handleSearch}>Search</button>
    </div>
    {showListAllButton && <button className="btn btn-primary mb-2" onClick={handleListAll}>List All</button>}
  </div>
  
  <div className="table-container">
    <table className="table table-bordered table-striped table-advanced table-hover">
      <thead>
        <tr>
          <th>Title</th>
          <th>Musician/Show</th>
          <th>Notes</th>
          <th>Listen on Spotify</th> {/* Added a new column for Spotify link */}
        </tr>
      </thead>
      <tbody>
        {filteredSongs.map(song => (
          <tr key={song.id}>
            <td>{song.title}</td>
            <td>{song.musician}</td>
            <td>{song.notes}</td>
            <td>
              {song.spotifyTrackId && <a href={getSpotifyLink(song.spotifyTrackId)} target="_blank" rel="noopener noreferrer">Listen</a>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default SongTable;
