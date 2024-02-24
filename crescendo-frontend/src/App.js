import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import Signup from './Signup';
import Verify from './Verify';
import Dashboard from './Dashboard';
import SongTable from './components/SongTable';
import AddSong from './pages/AddSong';
import NavBar from './NavBar';
import { AuthProvider } from './AuthContext';
import EditLibrary from './components/EditLibrary';
import EditSong from './components/EditSong';
import SongDetails from './SongDetails';



function App() {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
        <NavBar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/SongTable' element={<SongTable />} />
          <Route path='/AddSong' element={<AddSong />} />
          <Route path='/EditLibrary' element={<EditLibrary/>}/>
          <Route path={`/editSong/:id`} element={<EditSong />} />
          <Route path='/song/:id' element={<SongDetails />} />
        </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
