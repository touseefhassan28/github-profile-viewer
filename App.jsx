import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import UserDetail from './Components/UserDetails';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navbar />} />
        <Route path='/:username' element={<UserDetail />} />
      </Routes>
    </Router>
  )
}

export default App
