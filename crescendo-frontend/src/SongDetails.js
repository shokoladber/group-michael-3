// In SongDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SongDetails = () => {
  const { id } = useParams();
  const [songDetails, setSongDetails] = useState(null);
  

  useEffect(() => {
    const fetchSongDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/songs/${id}`);
        console.log(response);
        setSongDetails(response.data);
      } catch (error) {
        console.error('Error fetching song details:', error);
      }
    };

    fetchSongDetails();
  }, [id]);

  if (!songDetails) return <div>Loading...</div>;

  const imageUrl = `data:image/jpeg;base64,${songDetails.image}`;


  return (
    <div>
      <h1>Song Details</h1>
      <h2>{songDetails.title}</h2>
      <p>Musician/Show: {songDetails.musician}</p>
      <p>Notes: {songDetails.notes}</p>
      <img src={imageUrl} alt="Sheet Music" style={{ width: '500px', height: 'auto'}}/>
    </div>
  );
};

export default SongDetails;