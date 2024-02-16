import './App.css';
import React from 'react';
import Login from './Login';
import LandingPage from './LandingPage';
import Signup from './Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Verify from './Verify';
import Dashboard from './Dashboard';
import SongTable from './components/SongTable';
import AddSong from './pages/AddSong';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/SongTable' element={<SongTable />} />
          <Route path='/AddSong' element={<AddSong />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
