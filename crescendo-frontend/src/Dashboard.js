import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import SongTable from './components/SongTable';

function Dashboard() {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

    const navigateToAddSong = () => {
        navigate('/addSong');
    };
    const navigateToEditLibrary = () => {
        navigate('/Editlibrary')
    }

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <button onClick={navigateToAddSong} className="upload-button">Add Song</button>
            <button onClick={navigateToEditLibrary} className="edit-button">Edit Library</button>
            <p className='message'>{message}</p>
            <SongTable />
        </div>
    );
};

export default Dashboard;