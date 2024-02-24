import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../styles/SongTable.css';
// import EditLibrary from './EditLibrary';

const SongTable = () => {
  const [filteredSongs, setFilteredSongs] = useState([]);//stores the list of songs by id
  const [searchTerm, setSearchTerm] = useState('');//stores searchterm
  const [showListAllButton, setShowListAllButton] = useState(false);//allows navigation between pages
  const navigate = useNavigate();

  useEffect(() => {
    fetchSongs();
  }, []);

  // Fetches songs from backend server API
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

   // Function to search songs
  const handleSearch = async () => {
    try { //await axios pauses the execution of the function until a Promise is fulfilled or rejected
      const response = await axios.get(`http://localhost:8080/api/songs/search?keyword=${searchTerm}`);
      setFilteredSongs(response.data);
      setShowListAllButton(true);
    } catch (error) {
      console.error('Error searching songs:', error);
    }
  };

  // Function to create new song
  const handleAddSong = () => {
    navigate('/addSong'); // Navigate to the add song form
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
    <div className="containerFor">
      <h2 className="text-center">Your Music Repertoire</h2>
      <div className="search-container">
        <div>
          <button className="btn btn-primary mb-2" onClick={handleAddSong}>Add New Song</button>
        </div>
        <div className="search-input">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search By Song Title..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <button className="btn btn-primary mb-2" onClick={handleSearch}>Search</button>
          {showListAllButton && <button className="btn btn-primary mb-2" onClick={handleListAll}>List All</button>}
        </div>
      </div>
      <div className="container">
        <table className="table table-bordered table-striped table-advanced table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Musician/Show</th>
              <th>Notes</th>
              <th>Listen on Spotify</th>
            </tr>
          </thead>
          <tbody>
            {filteredSongs.map(song => (
              <tr key={song.id} onClick={() => navigate(`/song/${song.id}`)} style={{ cursor: 'pointer' }}>
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
