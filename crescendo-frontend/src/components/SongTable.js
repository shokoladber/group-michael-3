import React, { useState, useEffect } from 'react'; //useState returns 2 values -the current state & a function to update that value
                                                    //useEffect allows you to perform side effect functions like data fetching
import { useNavigate } from 'react-router-dom';//allows navigation between pages
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; //makes HTTP request
import '../styles/SongTable.css';
// import EditLibrary from './EditLibrary';

const SongTable = () => {
  const [filteredSongs, setFilteredSongs] = useState([]); //stores the list of songs by id (initially an empty array)
  const [searchTerm, setSearchTerm] = useState('');
  const [showListAllButton, setShowListAllButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSongs();
  }, []);

  //function to fetch (GET) songs once new song is created; populates the filteredSongs
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

  // function to search the list of songs sending a GET request
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



  const toggleFavorite = async (songId) => {
    try {
      await axios.put(`http://localhost:8080/api/songs/${songId}/favorite`);
      // After toggling, refresh the song list
      fetchSongs();
    } catch (error) {
      console.error('Error toggling favorite status:', error);
    }
  };


  const [showFavorites, setShowFavorites] = useState(false);
  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <div className="containerFor">
      <h2 className="text-center">Your Music Repertoire</h2>
      <div className="search-container">
        <div>
          <button className="btn btn-primary mb-2" onClick={handleAddSong}>Add New Song</button>
          <button className="btn btn-primary mb-2" onClick={handleShowFavorites}>
            {showFavorites ? "Show All Songs" : "Show Favorites"}
          </button>
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
              <th>Favorite</th>
            </tr>
          </thead>
          <tbody>
            {filteredSongs
            .filter(song => !showFavorites || song.favorite)
            .map(song => (
              <tr key={song.id} onClick={() => navigate(`/song/${song.id}`)} style={{ cursor: 'pointer' }}>
                <td>{song.title}</td>
                <td>{song.musician}</td>
                <td>{song.notes}</td>
                <td>
                  {song.spotifyTrackId && <a href={getSpotifyLink(song.spotifyTrackId)} target="_blank" rel="noopener noreferrer">Listen</a>}
                </td>
                <td onClick={(e) => { e.stopPropagation(); toggleFavorite(song.id); }}>
                  {song.favorite ? '★' : '☆'}
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